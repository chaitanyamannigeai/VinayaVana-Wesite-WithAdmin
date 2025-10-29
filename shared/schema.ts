import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const tariffSettings = pgTable("tariff_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  regularRate: integer("regular_rate").notNull(),
  peakRate: integer("peak_rate").notNull(),
  holidayRate: integer("holiday_rate").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertTariffSettingsSchema = createInsertSchema(tariffSettings).omit({
  id: true,
  updatedAt: true,
});

export const selectTariffSettingsSchema = createSelectSchema(tariffSettings);

export type InsertTariffSettings = z.infer<typeof insertTariffSettingsSchema>;
export type TariffSettings = typeof tariffSettings.$inferSelect;

export const cabDestinations = pgTable("cab_destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  destinationName: text("destination_name").notNull(),
  distance: text("distance").notNull(),
  duration: text("duration").notNull(),
  driverName: text("driver_name").notNull(),
  driverPhone: text("driver_phone").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const insertCabDestinationSchema = createInsertSchema(cabDestinations).omit({
  id: true,
});

export const selectCabDestinationSchema = createSelectSchema(cabDestinations);

export type InsertCabDestination = z.infer<typeof insertCabDestinationSchema>;
export type CabDestination = typeof cabDestinations.$inferSelect;

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  unit: text("unit").notNull(),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const selectBookingSchema = createSelectSchema(bookings);

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export const contactSettings = pgTable("contact_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  address: text("address").notNull(),
  googleMapsUrl: text("google_maps_url").notNull(),
  responseTime: text("response_time").notNull().default("1-2 hours during business hours (9 AM - 8 PM IST)"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContactSettingsSchema = createInsertSchema(contactSettings).omit({
  id: true,
  updatedAt: true,
});

export const selectContactSettingsSchema = createSelectSchema(contactSettings);

export type InsertContactSettings = z.infer<typeof insertContactSettingsSchema>;
export type ContactSettings = typeof contactSettings.$inferSelect;
