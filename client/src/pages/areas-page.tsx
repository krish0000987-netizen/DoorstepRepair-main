import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mumbaiAreas, regions, getAreasByRegion } from "@/lib/areas-data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function AreasPage() {
  usePageMeta(
    "Doorstep Mobile Repair Service Areas in Mumbai | Devices Doctor",
    "Devices Doctor provides doorstep mobile repair across Mumbai - Andheri, Bandra, Borivali, Thane, Navi Mumbai, Powai, Malad, Goregaon & all surrounding areas."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-areas-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/images/city-mumbai.jpg)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/70 via-[#0A1A3F]/50 to-[#0A1A3F]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 mb-6">
              <MapPin className="w-4 h-4 text-[#00FFE0]" />
              <span className="text-[#00C2FF] text-sm font-medium">{mumbaiAreas.length}+ Service Locations</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Areas We <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Serve</span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-lg max-w-2xl mx-auto">
              Doorstep device repair across Mumbai, Thane, Navi Mumbai & nearby regions. Our technicians come to you!
            </p>
          </motion.div>
        </div>
      </section>

      {regions.map((region, ri) => (
        <section
          key={region}
          className={`py-12 ${ri % 2 === 0 ? "bg-[#071533]" : "bg-[#0A1A3F]"}`}
          data-testid={`section-region-${ri}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#00C2FF]" />
                </div>
                <h2 className="text-2xl font-bold text-white">{region}</h2>
              </div>
              <p className="text-[#EAF7FF]/50 text-sm">{getAreasByRegion(region).length} areas covered</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {getAreasByRegion(region).map((area, i) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="group rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/50 to-[#0A1A3F]/70 p-4 text-center hover:border-[#00C2FF]/40 hover:shadow-[0_0_20px_rgba(0,194,255,0.1)] transition-all duration-300"
                  data-testid={`card-area-${area.name.replace(/\s/g, "-").toLowerCase()}`}
                >
                  <MapPin className="w-4 h-4 text-[#00C2FF] mx-auto mb-1.5 group-hover:text-[#00FFE0] transition-colors" />
                  <h3 className="text-white font-semibold text-sm">{area.name}</h3>
                  {area.popular && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#00FFE0]/10 border border-[#00FFE0]/20 text-[#00FFE0] text-[10px] font-medium">Popular</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-[#071533]" data-testid="section-areas-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Area?</h2>
          <p className="text-[#EAF7FF]/60 mb-8">We are expanding rapidly! Contact us and we'll check if we can serve your location.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918169701980?text=Hi%2C%20I%20want%20to%20check%20if%20you%20serve%20my%20area" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold px-8 shadow-[0_0_30px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate" data-testid="button-areas-whatsapp">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </Button>
            </a>
            <a href="tel:8169701980">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00C2FF]/40 text-[#00C2FF] bg-[#00C2FF]/5 px-8 no-default-hover-elevate no-default-active-elevate" data-testid="button-areas-call">
                <Phone className="w-5 h-5 mr-2" /> Call: 8169-701980
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
