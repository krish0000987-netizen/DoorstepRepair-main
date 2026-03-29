import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    desc: "Talk to our team directly",
    value: "8169-701980",
    href: "tel:8169701980",
    action: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "Chat with us instantly",
    value: "+91 8169701980",
    href: "https://wa.me/918169701980?text=Hi%2C%20I%20need%20a%20device%20repair",
    action: "Message Us",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "Send us an email",
    value: "devicesdoctor1993@gmail.com",
    href: "mailto:devicesdoctor1993@gmail.com",
    action: "Send Email",
  },
];

const businessHours = [
  { day: "Monday - Saturday", time: "9:00 AM - 8:00 PM" },
  { day: "Sunday", time: "10:00 AM - 6:00 PM" },
  { day: "Holidays", time: "Emergency service available" },
];

export default function ContactPage() {
  usePageMeta(
    "Contact Devices Doctor | Book Doorstep Mobile Repair in Mumbai",
    "Contact Devices Doctor for quick doorstep mobile repair in Mumbai. Call, WhatsApp, or book online. Available 7 days a week across all Mumbai areas."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-contact-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071533] to-[#0A1A3F]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contact <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-lg max-w-2xl mx-auto">
              Get in touch with us for device repair, service inquiries, or any questions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]" data-testid="section-contact-methods">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {contactMethods.map((m, i) => (
              <motion.a
                key={m.title}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 hover:border-[#00C2FF]/40 hover:shadow-[0_0_25px_rgba(0,194,255,0.1)] transition-all duration-300 text-center"
                data-testid={`card-contact-${m.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center mx-auto mb-4">
                  <m.icon className="w-7 h-7 text-[#00C2FF]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{m.title}</h3>
                <p className="text-[#EAF7FF]/50 text-sm mb-2">{m.desc}</p>
                <p className="text-[#00FFE0] font-semibold mb-4">{m.value}</p>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#00C2FF]/10 to-[#00FFE0]/10 border border-[#00C2FF]/30 text-[#00C2FF] text-sm font-medium group-hover:from-[#00C2FF]/20 group-hover:to-[#00FFE0]/20 transition-all">
                  {m.action}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-contact-hours">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#00C2FF]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Business Hours</h2>
              </div>
              <div className="space-y-3">
                {businessHours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center p-4 rounded-xl border border-[#00C2FF]/10 bg-[#0d2255]/30">
                    <span className="text-white font-medium text-sm">{h.day}</span>
                    <span className="text-[#00FFE0] font-semibold text-sm">{h.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00C2FF]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Service Area</h2>
              </div>
              <div className="p-6 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40">
                <p className="text-[#EAF7FF]/70 text-sm leading-relaxed mb-4">
                  We provide doorstep repair services across Mumbai, Thane, Navi Mumbai, and nearby regions. Our technicians come to your location - home, office, or anywhere.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Mumbai", "Thane", "Navi Mumbai", "Mira Road", "Vasai", "Virar", "Kalyan", "Dombivli"].map((area) => (
                    <span key={area} className="px-3 py-1.5 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-xs font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-6 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40">
                <h3 className="text-white font-bold mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-colors">
                    <SiInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-colors">
                    <SiFacebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
