import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  priceRange: text("price_range").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const serviceProblems = pgTable("service_problems", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
});

export const insertServiceProblemSchema = createInsertSchema(serviceProblems).omit({ id: true });
export type InsertServiceProblem = z.infer<typeof insertServiceProblemSchema>;
export type ServiceProblem = typeof serviceProblems.$inferSelect;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  deviceType: text("device_type").notNull(),
  brand: text("brand").notNull(),
  model: text("model"),
  problem: text("problem").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time").notNull(),
  estimatedPrice: integer("estimated_price"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, status: true, createdAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  service: text("service").notNull(),
  city: text("city").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  active: boolean("active").notNull().default(true),
});

export const insertCitySchema = createInsertSchema(cities).omit({ id: true });
export type InsertCity = z.infer<typeof insertCitySchema>;
export type City = typeof cities.$inferSelect;

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true });
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  section: varchar("section", { length: 100 }).notNull(),
  key: varchar("key", { length: 200 }).notNull(),
  value: text("value").notNull(),
  contentType: varchar("content_type", { length: 20 }).notNull().default("text"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true, updatedAt: true });
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  authorName: text("author_name").notNull().default("Admin"),
  publishDate: text("publish_date").notNull(),
  published: boolean("published").notNull().default(false),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogSchema = createInsertSchema(blogs).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;

export const brandModels = pgTable("brand_models", {
  id: serial("id").primaryKey(),
  brandSlug: varchar("brand_slug", { length: 100 }).notNull(),
  modelName: text("model_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBrandModelSchema = createInsertSchema(brandModels).omit({ id: true, createdAt: true });
export type InsertBrandModel = z.infer<typeof insertBrandModelSchema>;
export type BrandModel = typeof brandModels.$inferSelect;

export const bookingFormSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  deviceType: z.string().min(1, "Select a device type"),
  brand: z.string().min(1, "Select a brand"),
  model: z.string().optional(),
  problem: z.string().min(1, "Select a problem"),
  address: z.string().min(5, "Enter your full address"),
  city: z.string().min(1, "Select a city"),
  scheduledDate: z.string().min(1, "Select a date"),
  scheduledTime: z.string().min(1, "Select a time slot"),
  estimatedPrice: z.number().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
