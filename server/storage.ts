import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  services, type Service, type InsertService,
  serviceProblems, type ServiceProblem, type InsertServiceProblem,
  bookings, type Booking, type InsertBooking,
  reviews, type Review, type InsertReview,
  cities, type City, type InsertCity,
  adminUsers, type AdminUser, type InsertAdminUser,
  siteContent, type SiteContent, type InsertSiteContent,
  brandModels, type BrandModel, type InsertBrandModel,
  blogs, type Blog, type InsertBlog,
} from "@shared/schema";

let pool: pg.Pool;
let db: ReturnType<typeof drizzle>;

function getDb() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool);
  }
  return db;
}

export interface IStorage {
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  getServiceProblems(serviceId: number): Promise<ServiceProblem[]>;
  createServiceProblem(problem: InsertServiceProblem): Promise<ServiceProblem>;

  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;

  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;

  getCities(): Promise<City[]>;
  createCity(city: InsertCity): Promise<City>;

  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;
  getAdminCount(): Promise<number>;
  updateAdminPassword(username: string, passwordHash: string): Promise<void>;
  deleteAdmin(username: string): Promise<boolean>;

  getAllContent(): Promise<SiteContent[]>;
  getContentBySection(section: string): Promise<SiteContent[]>;
  getContentValue(section: string, key: string): Promise<string | undefined>;
  upsertContent(section: string, key: string, value: string, contentType?: string): Promise<SiteContent>;
  deleteContent(id: number): Promise<boolean>;

  getBrandModels(brandSlug: string): Promise<BrandModel[]>;
  getAllBrandModels(): Promise<BrandModel[]>;
  createBrandModel(model: InsertBrandModel): Promise<BrandModel>;
  deleteBrandModel(id: number): Promise<boolean>;

  getBlogs(publishedOnly?: boolean): Promise<Blog[]>;
  getBlogById(id: number): Promise<Blog | undefined>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return getDb().select().from(services);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await getDb().select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [created] = await getDb().insert(services).values(service).returning();
    return created;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await getDb().update(services).set(service).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await getDb().delete(services).where(eq(services.id, id));
    return true;
  }

  async getServiceProblems(serviceId: number): Promise<ServiceProblem[]> {
    return getDb().select().from(serviceProblems).where(eq(serviceProblems.serviceId, serviceId));
  }

  async createServiceProblem(problem: InsertServiceProblem): Promise<ServiceProblem> {
    const [created] = await getDb().insert(serviceProblems).values(problem).returning();
    return created;
  }

  async getBookings(): Promise<Booking[]> {
    return getDb().select().from(bookings);
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    const [booking] = await getDb().select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await getDb().insert(bookings).values(booking).returning();
    return created;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updated] = await getDb().update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
    return updated;
  }

  async deleteBooking(id: number): Promise<boolean> {
    await getDb().delete(bookings).where(eq(bookings.id, id));
    return true;
  }

  async getReviews(): Promise<Review[]> {
    return getDb().select().from(reviews);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [created] = await getDb().insert(reviews).values(review).returning();
    return created;
  }

  async updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined> {
    const [updated] = await getDb().update(reviews).set(review).where(eq(reviews.id, id)).returning();
    return updated;
  }

  async deleteReview(id: number): Promise<boolean> {
    await getDb().delete(reviews).where(eq(reviews.id, id));
    return true;
  }

  async getCities(): Promise<City[]> {
    return getDb().select().from(cities);
  }

  async createCity(city: InsertCity): Promise<City> {
    const [created] = await getDb().insert(cities).values(city).returning();
    return created;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await getDb().select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const [created] = await getDb().insert(adminUsers).values(admin).returning();
    return created;
  }

  async getAdminCount(): Promise<number> {
    const result = await getDb().select().from(adminUsers);
    return result.length;
  }

  async updateAdminPassword(username: string, passwordHash: string): Promise<void> {
    await getDb().update(adminUsers).set({ passwordHash }).where(eq(adminUsers.username, username));
  }

  async deleteAdmin(username: string): Promise<boolean> {
    await getDb().delete(adminUsers).where(eq(adminUsers.username, username));
    return true;
  }

  async getAllContent(): Promise<SiteContent[]> {
    return getDb().select().from(siteContent);
  }

  async getContentBySection(section: string): Promise<SiteContent[]> {
    return getDb().select().from(siteContent).where(eq(siteContent.section, section));
  }

  async getContentValue(section: string, key: string): Promise<string | undefined> {
    const [item] = await getDb().select().from(siteContent)
      .where(and(eq(siteContent.section, section), eq(siteContent.key, key)));
    return item?.value;
  }

  async upsertContent(section: string, key: string, value: string, contentType: string = "text"): Promise<SiteContent> {
    const [existing] = await getDb().select().from(siteContent)
      .where(and(eq(siteContent.section, section), eq(siteContent.key, key)));

    if (existing) {
      const [updated] = await getDb().update(siteContent)
        .set({ value, contentType, updatedAt: new Date() })
        .where(eq(siteContent.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await getDb().insert(siteContent)
        .values({ section, key, value, contentType })
        .returning();
      return created;
    }
  }

  async deleteContent(id: number): Promise<boolean> {
    await getDb().delete(siteContent).where(eq(siteContent.id, id));
    return true;
  }

  async getBrandModels(brandSlug: string): Promise<BrandModel[]> {
    return getDb().select().from(brandModels).where(eq(brandModels.brandSlug, brandSlug));
  }

  async getAllBrandModels(): Promise<BrandModel[]> {
    return getDb().select().from(brandModels);
  }

  async createBrandModel(model: InsertBrandModel): Promise<BrandModel> {
    const [created] = await getDb().insert(brandModels).values(model).returning();
    return created;
  }

  async deleteBrandModel(id: number): Promise<boolean> {
    await getDb().delete(brandModels).where(eq(brandModels.id, id));
    return true;
  }

  async getBlogs(publishedOnly: boolean = false): Promise<Blog[]> {
    if (publishedOnly) {
      return getDb().select().from(blogs).where(eq(blogs.published, true));
    }
    return getDb().select().from(blogs);
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    const [blog] = await getDb().select().from(blogs).where(eq(blogs.id, id));
    return blog;
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    const [blog] = await getDb().select().from(blogs).where(eq(blogs.slug, slug));
    return blog;
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const [created] = await getDb().insert(blogs).values(blog).returning();
    return created;
  }

  async updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const [updated] = await getDb().update(blogs).set({ ...blog, updatedAt: new Date() }).where(eq(blogs.id, id)).returning();
    return updated;
  }

  async deleteBlog(id: number): Promise<boolean> {
    await getDb().delete(blogs).where(eq(blogs.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
