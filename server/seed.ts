import { db } from "./db";
import { users, tariffSettings, cabDestinations, bookings, contactSettings } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  const adminUsername = "admin";
  const adminPassword = "admin123";

  const existingAdmin = await db.select().from(users).where(eq(users.username, adminUsername));

  if (existingAdmin.length === 0) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await db.insert(users).values({
      username: adminUsername,
      password: hashedPassword,
      isAdmin: true,
    });
    console.log(`✅ Admin user created (username: ${adminUsername}, password: ${adminPassword})`);
  } else {
    console.log("⏭️  Admin user already exists");
  }

  const existingTariff = await db.select().from(tariffSettings);
  if (existingTariff.length === 0) {
    await db.insert(tariffSettings).values({
      regularRate: 3500,
      peakRate: 4500,
      holidayRate: 5000,
    });
    console.log("✅ Default tariff settings created");
  } else {
    console.log("⏭️  Tariff settings already exist");
  }

  const existingCabDestinations = await db.select().from(cabDestinations);
  if (existingCabDestinations.length === 0) {
    await db.insert(cabDestinations).values([
      {
        destinationName: "Yana Caves",
        distance: "45 km",
        duration: "1.5 hours",
        driverName: "Shriram Nadkarni",
        driverPhone: "918073962970",
        description: "Visit the famous Yana rock formations and ancient caves surrounded by lush forest.",
        imageUrl: null,
        displayOrder: 1,
      },
      {
        destinationName: "Murdeshwar Temple",
        distance: "75 km",
        duration: "2 hours",
        driverName: "Shriram Nadkarni",
        driverPhone: "918073962970",
        description: "Explore the magnificent Shiva temple with the world's second tallest statue.",
        imageUrl: null,
        displayOrder: 2,
      },
      {
        destinationName: "Gokarna Beach",
        distance: "20 km",
        duration: "40 minutes",
        driverName: "Shriram Nadkarni",
        driverPhone: "918073962970",
        description: "Enjoy pristine beaches and spiritual vibes at the famous Gokarna town.",
        imageUrl: null,
        displayOrder: 3,
      },
    ]);
    console.log("✅ Default cab destinations created");
  } else {
    console.log("⏭️  Cab destinations already exist");
  }

  const existingBookings = await db.select().from(bookings);
  if (existingBookings.length === 0) {
    await db.insert(bookings).values([
      { unit: "2nd-floor", checkIn: "2025-12-25", checkOut: "2025-12-28" },
      { unit: "2nd-floor", checkIn: "2025-12-29", checkOut: "2026-01-01" },
      { unit: "ground-floor", checkIn: "2025-10-03", checkOut: "2026-01-08" },
      { unit: "cottage-1", checkIn: "2025-10-03", checkOut: "2026-01-08" },
    ]);
    console.log("✅ Sample bookings created");
  } else {
    console.log("⏭️  Bookings already exist");
  }

  const existingContactSettings = await db.select().from(contactSettings);
  if (existingContactSettings.length === 0) {
    await db.insert(contactSettings).values({
      phone: "+919371025182",
      email: "stay.vinayavana@gmail.com",
      whatsappNumber: "919371025182",
      address: "VinayaVana Homestay, Hanehelli, Near Ramanath Rice Mill, Bankikodla Rd, Gokarna, Karnataka 581326",
      googleMapsUrl: "https://maps.app.goo.gl/wMqZ1gbei1KsHLky8",
      responseTime: "1-2 hours during business hours (9 AM - 8 PM IST)",
    });
    console.log("✅ Default contact settings created");
  } else {
    console.log("⏭️  Contact settings already exist");
  }

  console.log("🎉 Database seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
