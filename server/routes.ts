import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import {
  bookings,
  tariffSettings,
  cabDestinations,
  contactSettings,
  users,
  insertTariffSettingsSchema,
  insertCabDestinationSchema,
  insertBookingSchema,
  insertContactSettingsSchema,
} from "@shared/schema";
import { login, requireAdmin } from "./auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  // intervals overlap if they intersect: [aStart, aEnd) vs [bStart, bEnd)
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await login(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin;

    res.json({ success: true, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json({ userId: req.session.userId, isAdmin: req.session.isAdmin });
  });

  app.post("/api/admin/change-password", requireAdmin, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current password and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters" });
      }

      const user = await db.select().from(users).where(eq(users.id, req.session.userId!));

      if (user.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(currentPassword, user[0].password);

      if (!validPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, req.session.userId!));

      res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).json({ error: error instanceof Error ? error.message : "Failed to change password" });
    }
  });

  app.get("/api/tariff", async (req, res) => {
    const settings = await db.select().from(tariffSettings).limit(1);
    if (settings.length === 0) {
      return res.status(404).json({ error: "Tariff settings not found" });
    }
    res.json(settings[0]);
  });

  app.put("/api/admin/tariff", requireAdmin, async (req, res) => {
    try {
      const validated = insertTariffSettingsSchema.parse(req.body);

      const existing = await db.select().from(tariffSettings).limit(1);

      if (existing.length === 0) {
        const result = await db.insert(tariffSettings).values(validated).returning();
        return res.json(result[0]);
      }

      const result = await db.update(tariffSettings)
        .set({ ...validated, updatedAt: new Date() })
        .where(eq(tariffSettings.id, existing[0].id))
        .returning();

      res.json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.get("/api/cab-destinations", async (req, res) => {
    const destinations = await db.select().from(cabDestinations).orderBy(cabDestinations.displayOrder);
    res.json(destinations);
  });

  app.post("/api/admin/cab-destinations", requireAdmin, async (req, res) => {
    try {
      const validated = insertCabDestinationSchema.parse(req.body);
      const result = await db.insert(cabDestinations).values(validated).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.put("/api/admin/cab-destinations/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validated = insertCabDestinationSchema.parse(req.body);
      const result = await db.update(cabDestinations)
        .set(validated)
        .where(eq(cabDestinations.id, id))
        .returning();

      if (result.length === 0) {
        return res.status(404).json({ error: "Destination not found" });
      }

      res.json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/admin/cab-destinations/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    await db.delete(cabDestinations).where(eq(cabDestinations.id, id));
    res.json({ success: true });
  });

  app.get("/api/availability", async (req, res) => {
    const unit = (req.query.unit as string) || "";
    const checkIn = (req.query.checkIn as string) || "";
    const checkOut = (req.query.checkOut as string) || "";

    if (!unit || !checkIn || !checkOut) {
      return res.status(400).json({ error: "unit, checkIn, checkOut are required" });
    }
    if (isNaN(Date.parse(checkIn)) || isNaN(Date.parse(checkOut)) || checkIn >= checkOut) {
      return res.status(400).json({ error: "invalid date range" });
    }

    const allBookings = await db.select().from(bookings);

    const conflicts = allBookings.filter(
      b => b.unit === unit && overlaps(checkIn, checkOut, b.checkIn, b.checkOut)
    );

    const available = conflicts.length === 0;

    const suggestions = available ? [] : (() => {
      const days = 3;
      let start = new Date(checkOut);
      for (let i = 0; i < 30; i++) {
        const s = new Date(start);
        const e = new Date(start); e.setDate(e.getDate() + days);
        const sISO = s.toISOString().slice(0,10);
        const eISO = e.toISOString().slice(0,10);
        const clash = allBookings.some(b => b.unit === unit && overlaps(sISO, eISO, b.checkIn, b.checkOut));
        if (!clash) return [{ checkIn: sISO, checkOut: eISO }];
        start.setDate(start.getDate() + 1);
      }
      return [];
    })();

    res.json({ available, conflicts, suggestions });
  });

  app.get("/api/admin/bookings", requireAdmin, async (req, res) => {
    const allBookings = await db.select().from(bookings);
    res.json(allBookings);
  });

  app.post("/api/admin/bookings", requireAdmin, async (req, res) => {
    try {
      const validated = insertBookingSchema.parse(req.body);
      
      const allBookings = await db.select().from(bookings);
      if (allBookings.some(b => b.unit === validated.unit && overlaps(validated.checkIn, validated.checkOut, b.checkIn, b.checkOut))) {
        return res.status(409).json({ error: "dates overlap existing booking" });
      }
      
      const result = await db.insert(bookings).values(validated).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/admin/bookings/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    await db.delete(bookings).where(eq(bookings.id, id));
    res.json({ success: true });
  });

  app.get("/api/contact", async (req, res) => {
    const settings = await db.select().from(contactSettings).limit(1);
    if (settings.length === 0) {
      return res.status(404).json({ error: "Contact settings not found" });
    }
    res.json(settings[0]);
  });

  app.put("/api/admin/contact", requireAdmin, async (req, res) => {
    try {
      const validated = insertContactSettingsSchema.parse(req.body);

      const existing = await db.select().from(contactSettings).limit(1);

      if (existing.length === 0) {
        const result = await db.insert(contactSettings).values(validated).returning();
        return res.json(result[0]);
      }

      const result = await db.update(contactSettings)
        .set({ ...validated, updatedAt: new Date() })
        .where(eq(contactSettings.id, existing[0].id))
        .returning();

      res.json(result[0]);
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  return createServer(app);
}
