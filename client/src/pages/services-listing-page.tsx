import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { serviceDetails } from "@/lib/brands-data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function ServicesListingPage() {
  usePageMeta(
    "Mobile Repair Services in Mumbai | Screen, Battery, Charging & More | Devices Doctor",
    "Explore all doorstep mobile repair services by Devices Doctor - Screen Replacement, Battery, Charging Issues, Water Damage, Motherboard Repair & more. Available across Mumbai."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-services-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/images/svc-screen.jpg)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/70 via-[#0A1A3F]/50 to-[#0A1A3F]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-lg max-w-2xl mx-auto">
              Professional doorstep repair services for all your devices. Expert technicians, genuine parts, 3 to 6 months warranty.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]" data-testid="section-services-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {serviceDetails.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="group relative rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/60 to-[#0A1A3F]/80 overflow-hidden transition-all duration-300 hover:border-[#00C2FF]/40 hover:shadow-[0_0_25px_rgba(0,194,255,0.1)] cursor-pointer h-full"
                  data-testid={`card-service-${service.slug}`}
                >
                  <div className="relative h-32 sm:h-40 lg:h-44 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/60 to-[#0A1A3F]/20" />
                  </div>
                  <div className="p-3 sm:p-4 lg:p-5">
                    <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 flex items-center gap-1">
                      {service.name}
                      <ChevronRight className="w-4 h-4 text-[#00C2FF]/50 group-hover:text-[#00C2FF] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </h3>
                    <p className="text-[#EAF7FF]/50 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 2).map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded-md bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-[10px] sm:text-xs">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
