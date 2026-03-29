import { storage } from "./storage";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  const existingCities = await storage.getCities();
  if (existingCities.length === 0) {
    await Promise.all([
      storage.createCity({ name: "Andheri", state: "Maharashtra", active: true }),
      storage.createCity({ name: "Bandra", state: "Maharashtra", active: true }),
      storage.createCity({ name: "Borivali", state: "Maharashtra", active: true }),
      storage.createCity({ name: "Thane", state: "Maharashtra", active: true }),
      storage.createCity({ name: "Navi Mumbai", state: "Maharashtra", active: true }),
      storage.createCity({ name: "Powai", state: "Maharashtra", active: true }),
    ]);
  }

  const services = await storage.getServices();
  if (services.length === 0) {
    const servicesData = [
      { name: "Screen Replacement", description: "Professional screen replacement with original quality displays for all devices", icon: "Monitor", category: "repair", priceRange: "" },
      { name: "Battery Replacement", description: "Genuine battery replacement for improved performance and battery life", icon: "Battery", category: "repair", priceRange: "" },
      { name: "Charging Issues", description: "Fix charging port, wireless charging and cable issues", icon: "Zap", category: "repair", priceRange: "" },
      { name: "Software Problems", description: "Complete software repair including OS reinstall, virus removal", icon: "Code", category: "repair", priceRange: "" },
      { name: "Water Damage Treatment", description: "Emergency water damage repair and component cleaning", icon: "Droplets", category: "repair", priceRange: "" },
      { name: "Camera & Speaker Repair", description: "Fix blurry camera, mic issues, and speaker problems", icon: "Camera", category: "repair", priceRange: "" },
    ];

    for (const s of servicesData) {
      await storage.createService(s);
    }
  }

  const existingReviews = await storage.getReviews();
  if (existingReviews.length === 0) {
    const reviewsData = [
      { customerName: "Rahul Sharma", rating: 5, comment: "Amazing service! My phone screen was replaced in just 25 minutes at my doorstep. The technician was very professional and used genuine parts. Highly recommended!", service: "Screen Replacement", city: "Andheri" },
      { customerName: "Priya Patel", rating: 5, comment: "Very professional technician came to my office and fixed my laptop battery within 30 minutes. Great warranty and genuine parts. Will definitely use again!", service: "Battery Replacement", city: "Bandra" },
      { customerName: "Amit Kumar", rating: 4, comment: "Excellent service! The technician was polite and skilled. Fixed my charging issue quickly. Very happy with the quality!", service: "Charging Issues", city: "Thane" },
      { customerName: "Sneha Gupta", rating: 5, comment: "Saved my water damaged phone! I thought it was gone forever but the technician fixed it perfectly. Amazing work and great warranty!", service: "Water Damage Treatment", city: "Powai" },
      { customerName: "Vikram Singh", rating: 5, comment: "Best doorstep repair service I have ever used. Camera was fixed in 20 minutes. No hidden charges and excellent work!", service: "Camera & Speaker Repair", city: "Borivali" },
    ];

    for (const r of reviewsData) {
      await storage.createReview(r);
    }
  }

  const adminCount = await storage.getAdminCount();
  const passwordHash = await bcrypt.hash("000999", 10);
  if (adminCount === 0) {
    await storage.createAdmin({ username: "admin", passwordHash });
    console.log("Default admin created (username: admin, password: 000999)");
  } else {
    await storage.updateAdminPassword("admin", passwordHash);
    console.log("Admin password synced.");
  }

  const existingContent = await storage.getAllContent();
  if (existingContent.length === 0) {
    const defaultContent = [
      { section: "hero", key: "badge", value: "Fast & Reliable Service" },
      { section: "hero", key: "title_line1", value: "DEVICES" },
      { section: "hero", key: "title_line2", value: "DOCTOR" },
      { section: "hero", key: "subtitle", value: "Your Device Health Experts" },
      { section: "hero", key: "highlight", value: "30 Minutes Doorstep Repair Service" },
      { section: "hero", key: "description", value: "We Repair Onsite Within 30 Minutes! All Mobile Brands, Laptops, Tablets & Smart Watches." },
      { section: "hero", key: "button_primary", value: "Book Repair Now" },
      { section: "hero", key: "button_secondary", value: "WhatsApp Booking" },
      { section: "hero", key: "technician_count", value: "50+ Certified Technicians" },
      { section: "hero", key: "rating", value: "4.9/5 Rating" },
      { section: "hero", key: "hero_image", value: "/images/hero-device.png", contentType: "image" },

      { section: "cta", key: "title", value: "Need Help?" },
      { section: "cta", key: "title_highlight", value: "Call Now!" },
      { section: "cta", key: "phone", value: "8169701980" },
      { section: "cta", key: "phone_display", value: "8169-701980" },
      { section: "cta", key: "tagline", value: "Fast • Reliable • Trusted" },
      { section: "cta", key: "whatsapp_number", value: "918169701980" },
      { section: "cta", key: "feature_1", value: "Certified Technicians" },
      { section: "cta", key: "feature_2", value: "Genuine Parts" },
      { section: "cta", key: "feature_3", value: "3 to 6 Months Warranty" },

      { section: "about", key: "title", value: "About" },
      { section: "about", key: "title_highlight", value: "Devices Doctor" },
      { section: "about", key: "description", value: "Your trusted partner for doorstep device repair in Mumbai & nearby areas. Fast, reliable, and affordable." },
      { section: "about", key: "stat_1_value", value: "10,000+" },
      { section: "about", key: "stat_1_label", value: "Repairs Done" },
      { section: "about", key: "stat_2_value", value: "50+" },
      { section: "about", key: "stat_2_label", value: "Technicians" },
      { section: "about", key: "stat_3_value", value: "30 Min" },
      { section: "about", key: "stat_3_label", value: "Avg. Repair" },
      { section: "about", key: "stat_4_value", value: "4.9★" },
      { section: "about", key: "stat_4_label", value: "Rating" },
      { section: "about", key: "mission_title", value: "Our Mission" },
      { section: "about", key: "mission_description", value: "To provide fast, reliable, and affordable device repair services at your doorstep. We believe everyone deserves quality repair without the hassle of visiting a service center." },
      { section: "about", key: "value_1_title", value: "Quality First" },
      { section: "about", key: "value_1_description", value: "We use only genuine parts and follow manufacturer guidelines for every repair." },
      { section: "about", key: "value_2_title", value: "Customer Focus" },
      { section: "about", key: "value_2_description", value: "Your convenience is our priority. We come to you, saving your time and effort." },
      { section: "about", key: "value_3_title", value: "Transparency" },
      { section: "about", key: "value_3_description", value: "No hidden charges. We explain the issue and give you a fair estimate before starting." },

      { section: "contact", key: "title", value: "Contact" },
      { section: "contact", key: "title_highlight", value: "Us" },
      { section: "contact", key: "description", value: "Get in touch with us for device repair, service inquiries, or any questions." },
      { section: "contact", key: "phone", value: "8169701980" },
      { section: "contact", key: "email", value: "devicesdoctor1993@gmail.com" },
      { section: "contact", key: "whatsapp", value: "918169701980" },
      { section: "contact", key: "address", value: "Mumbai, Maharashtra, India" },
      { section: "contact", key: "hours_weekday", value: "Monday - Saturday: 9:00 AM - 7:00 PM" },
      { section: "contact", key: "hours_weekend", value: "Sunday: 10:00 AM - 5:00 PM" },

      { section: "footer", key: "company_name", value: "Devices Doctor" },
      { section: "footer", key: "company_description", value: "Mumbai's trusted doorstep device repair service. We fix mobiles, laptops, tablets & smart watches at your location." },
      { section: "footer", key: "phone", value: "8169701980" },
      { section: "footer", key: "email", value: "devicesdoctor1993@gmail.com" },
      { section: "footer", key: "instagram", value: "https://www.instagram.com/devicesdoctor1993?igsh=aW9tY3hvMXRsdzF2" },
      { section: "footer", key: "facebook", value: "https://www.facebook.com/share/17wypKXAtc/" },
      { section: "footer", key: "copyright", value: "© 2025 Devices Doctor. All rights reserved." },

      { section: "specialities", key: "item_1_title", value: "Mobile Phones" },
      { section: "specialities", key: "item_1_description", value: "All brands including iPhone, Samsung, OnePlus, Xiaomi & more" },
      { section: "specialities", key: "item_2_title", value: "Laptops" },
      { section: "specialities", key: "item_2_description", value: "MacBook, HP, Dell, Lenovo, Asus & all other brands" },
      { section: "specialities", key: "item_3_title", value: "Tablets & Smart Watches" },
      { section: "specialities", key: "item_3_description", value: "iPad, Samsung Tab, Apple Watch & all smart devices" },

      { section: "why_choose", key: "reason_1_title", value: "30-Min Doorstep Service" },
      { section: "why_choose", key: "reason_1_description", value: "Our technician arrives at your location and completes the repair in just 30 minutes." },
      { section: "why_choose", key: "reason_2_title", value: "Genuine Parts & Warranty" },
      { section: "why_choose", key: "reason_2_description", value: "We use only genuine quality parts and provide 3 to 6 months warranty on all repairs." },
      { section: "why_choose", key: "reason_3_title", value: "Certified Technicians" },
      { section: "why_choose", key: "reason_3_description", value: "Our expert technicians are trained and certified to handle all device repairs." },
      { section: "why_choose", key: "reason_4_title", value: "No Hidden Charges" },
      { section: "why_choose", key: "reason_4_description", value: "Transparent pricing with no surprises. You pay exactly what we quote." },

      { section: "privacy", key: "title", value: "Privacy" },
      { section: "privacy", key: "title_highlight", value: "Policy" },
      { section: "privacy", key: "subtitle", value: "Your privacy is important to us. This policy explains how we handle your personal data." },
      { section: "privacy", key: "section_1_title", value: "What is this privacy notice for?" },
      { section: "privacy", key: "section_1_content", value: "We may handle your personal data in connection with your use of the Platform. This privacy notice set out, for the Platform, our collection and sharing practices, the uses to which personal data is put, the ways in which we protect it in accordance with the data protection and your privacy rights. Please read it carefully. This Statement applies to Personal Data processed by Devices Doctor when you:\n\nUse, download, access, as applicable, any of our various internet-based offerings, including mobile platforms, software, or applications.\n\nReceive communications from us, including emails, phone calls, or other electronic messages or Data we collect. We collect some information directly from you (for example, via forms you complete in our website or otherwise obtain). Such information is generally limited to:" },
      { section: "privacy", key: "section_1_items", value: "Name, Contact details, Email ID, IMEI, Device Details\nYour communications with Devices Doctor personally\nInformation you provide on the Website, such as online questionnaires, or feedback forms\nInformation you provide when you subscribe to SMS services\nInformation you provide when you create your account, log-in credentials and information about your use of and preferences for the services\nOther information is received indirectly from you via use of the services (for example, from observing your actions on the Website or any account access)" },
      { section: "privacy", key: "section_2_title", value: "How do we use your information?" },
      { section: "privacy", key: "section_2_content", value: "We use the information we collect for the following purposes:" },
      { section: "privacy", key: "section_2_items", value: "To process and complete your repair bookings\nTo communicate with you about your service requests\nTo send you service-related notifications and updates\nTo improve our services and customer experience\nTo respond to your inquiries and support requests\nTo comply with legal obligations" },
      { section: "privacy", key: "section_3_title", value: "Data Protection" },
      { section: "privacy", key: "section_3_content", value: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and access is restricted to authorized personnel only.\n\nWe do not sell, trade, or rent your personal information to third parties. We may share your information only with technicians assigned to your repair service and as required by law." },
      { section: "privacy", key: "section_4_title", value: "Your Rights" },
      { section: "privacy", key: "section_4_content", value: "You have the right to:" },
      { section: "privacy", key: "section_4_items", value: "Access and review your personal data\nRequest correction of inaccurate data\nRequest deletion of your data\nOpt-out of marketing communications" },
      { section: "privacy", key: "section_5_title", value: "Contact Us" },
      { section: "privacy", key: "section_5_content", value: "If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to us:" },
      { section: "privacy", key: "contact_email", value: "support@devicesdoctor.in" },
      { section: "privacy", key: "contact_phone", value: "8169-701980" },
      { section: "privacy", key: "contact_address", value: "Mumbai, Maharashtra, India" },

      { section: "terms", key: "title", value: "Terms &" },
      { section: "terms", key: "title_highlight", value: "Conditions" },
      { section: "terms", key: "subtitle", value: "Please read our terms of service, warranty policy, and service charges carefully." },
      { section: "terms", key: "warranty_charges_title", value: "Is there any extra charges to claim the warranty on the parts repaired by you?" },
      { section: "terms", key: "warranty_charges_content", value: "If the problem in the replaced part is informed within 24 hours after replacement then no extra charges will be applicable. If the problem is reported after that we will arrange revisit and Rs.499 will be applicable as technician visit charge in the case of onsite servicing." },
      { section: "terms", key: "warranty_covered_title", value: "Warranty Covered on Screen Replacement?" },
      { section: "terms", key: "warranty_covered_items", value: "Touch not working\nTouch slow working" },
      { section: "terms", key: "not_covered_title", value: "What is not covered under warranty?" },
      { section: "terms", key: "not_covered_items", value: "Water damage / Physical damage\nBlank Screen / Reflector Issue\nAny internal hardware damage" },
      { section: "terms", key: "payment_title", value: "How can I make payment?" },
      { section: "terms", key: "payment_content", value: "You can make payment via cash, Paytm, Google Pay, PhonePe or online payment after the repair is completed." },
      { section: "terms", key: "faulty_parts_title", value: "Replace Faulty Parts" },
      { section: "terms", key: "faulty_parts_content", value: "Replace faulty parts must be submitted to our technician after repair/services of your device otherwise warranty will not covered." },
      { section: "terms", key: "service_charges_title", value: "Service/Visit charges" },
      { section: "terms", key: "service_charges_content", value: "A minimum service/visit charge of Rs.499/- has to be paid in case of deny to repair or job will not completed or estimate cost will not approved." },
      { section: "terms", key: "general_terms_title", value: "General Terms" },
      { section: "terms", key: "general_terms_items", value: "All prices mentioned are subject to change without prior notice.\nDevices Doctor reserves the right to refuse service if the device condition is beyond repair.\nThe warranty is void if the device is opened or tampered with by any unauthorized person after our repair.\nWe are not liable for any data loss during the repair process. Customers are advised to backup their data before repair.\nEstimated repair time may vary depending on the complexity of the issue and parts availability." },

      { section: "navbar", key: "logo_text_1", value: "DEVICES" },
      { section: "navbar", key: "logo_text_2", value: "DOCTOR" },
      { section: "navbar", key: "phone", value: "8169701980" },
    ];

    for (const c of defaultContent) {
      await storage.upsertContent(c.section, c.key, c.value, (c as any).contentType || "text");
    }
    console.log("Default site content seeded!");
  }

  const dataMigrations: { section: string; key: string; oldValues: string[]; newValue: string }[] = [
    { section: "cta", key: "feature_3", oldValues: ["90-Day Warranty", "6-Month Warranty"], newValue: "3 to 6 Months Warranty" },
    { section: "why_choose", key: "reason_2_description", oldValues: ["We use only genuine quality parts and provide 90-day warranty on all repairs.", "We use only genuine quality parts and provide 6-month warranty on all repairs."], newValue: "We use only genuine quality parts and provide 3 to 6 months warranty on all repairs." },
    { section: "footer", key: "company_description", oldValues: ["Mumbai's trusted doorstep device repair service. We fix mobiles, laptops, tablets & smart watches at your location."], newValue: "Fast & Trusted 30 Minutes Doorstep Repair Service for all your devices. Genuine parts with 3 to 6 months warranty." },
    { section: "footer", key: "email", oldValues: ["info@devicesdoctor.com", ""], newValue: "devicesdoctor1993@gmail.com" },
    { section: "footer", key: "instagram", oldValues: ["#", ""], newValue: "https://www.instagram.com/devicesdoctor1993?igsh=aW9tY3hvMXRsdzF2" },
    { section: "footer", key: "facebook", oldValues: ["#", ""], newValue: "https://www.facebook.com/share/17wypKXAtc/" },
  ];

  const allContent = await storage.getAllContent();
  for (const migration of dataMigrations) {
    const entry = allContent.find((c: any) => c.section === migration.section && c.key === migration.key);
    if (entry && migration.oldValues.includes(entry.value)) {
      await storage.upsertContent(migration.section, migration.key, migration.newValue, "text");
      console.log(`Migrated ${migration.section}.${migration.key} to "${migration.newValue}"`);
    }
  }

  console.log("Database seeded successfully!");
}
