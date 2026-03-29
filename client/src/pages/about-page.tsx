import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle2, Users, Award, Wrench, Star, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+", label: "Expert Technicians" },
  { value: "30 Min", label: "Avg Repair Time" },
  { value: "3-6 Months", label: "Warranty Period" },
];

const values = [
  { icon: Clock, title: "Speed", description: "We repair your device at your doorstep within 30 minutes. No waiting, no shop visits." },
  { icon: Shield, title: "Trust", description: "All repairs backed by 3 to 6 months warranty. We use genuine quality parts certified for performance." },
  { icon: CheckCircle2, title: "Quality", description: "Our certified technicians are trained professionals who handle your device with expert care." },
  { icon: Users, title: "Customer First", description: "Complete transparency with no hidden charges. We explain every repair before we start." },
  { icon: Award, title: "Experience", description: "Years of experience repairing all major brands - Apple, Samsung, Xiaomi, OnePlus and more." },
  { icon: Wrench, title: "All Devices", description: "We repair mobiles, laptops, tablets, and smart watches. One stop for all your device needs." },
];

export default function AboutPage() {
  usePageMeta(
    "About Devices Doctor | Trusted Mobile Repair Experts in Mumbai",
    "Learn about Devices Doctor - Mumbai's trusted doorstep mobile repair service. 500+ happy customers, 50+ expert technicians, genuine parts and 3-6 months warranty on all repairs."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-about-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url(/images/why-choose.jpg)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/70 to-[#0A1A3F]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Devices Doctor</span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-lg max-w-2xl mx-auto">
              Your trusted partner for doorstep device repair in Mumbai & nearby areas. Fast, reliable, and affordable.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#071533]" data-testid="section-about-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40"
              >
                <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <p className="text-[#EAF7FF]/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-about-story">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-[#EAF7FF]/70 text-base leading-relaxed">
              <p>
                Devices Doctor was founded with a simple mission: to make device repair as easy and convenient as possible. We understood the frustration of broken screens, dead batteries, and the hassle of visiting repair shops.
              </p>
              <p>
                That's why we bring our expert technicians directly to your doorstep. Whether you're at home, office, or anywhere in Mumbai, we come to you and fix your device within 30 minutes.
              </p>
              <p>
                Our team of 50+ certified technicians is trained to handle all major brands and all types of repairs. We use genuine quality parts and provide a 3 to 6 months warranty on every repair.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#071533]" data-testid="section-about-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 hover:border-[#00C2FF]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-[#00C2FF]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-[#EAF7FF]/50 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-about-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Your Device Fixed?</h2>
          <p className="text-[#EAF7FF]/60 mb-8">Book a repair now and experience the Devices Doctor difference.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918169701980?text=Hi%2C%20I%20need%20a%20device%20repair" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold px-8 shadow-[0_0_30px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate" data-testid="button-about-whatsapp">
                <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
              </Button>
            </a>
            <a href="tel:8169701980">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00C2FF]/40 text-[#00C2FF] bg-[#00C2FF]/5 px-8 no-default-hover-elevate no-default-active-elevate" data-testid="button-about-call">
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
