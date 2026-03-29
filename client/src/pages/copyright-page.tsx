import { motion } from "framer-motion";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function CopyrightPage() {
  usePageMeta(
    "Copyright | Devices Doctor",
    "Copyright information for Devices Doctor. All content, images, and brand assets are the property of Devices Doctor."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-copyright-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/70 via-[#0A1A3F]/50 to-[#0A1A3F]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Copy<span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">right</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]" data-testid="section-copyright-content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-[#00C2FF]/20 bg-gradient-to-br from-[#0d2255]/70 to-[#0A1A3F]/90 p-6 sm:p-10"
          >
            <div className="text-center mb-8">
              <p className="text-[#00C2FF] text-lg font-bold mb-6" data-testid="text-copyright-year">
                &copy; 2026 DEVICES DOCTOR
              </p>
              <p className="text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed" data-testid="text-copyright-notice">
                All product names, logos, and brands are property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
              </p>
            </div>

            <div className="border-t border-[#00C2FF]/15 pt-8">
              <h3 className="text-white font-bold text-lg text-center mb-6">Connect With Us</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a
                  href="https://www.instagram.com/devicesdoctor1993?igsh=aW9tY3hvMXRsdzF2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00C2FF]/20 bg-[#0A1A3F]/60 hover:border-[#00C2FF]/50 transition-all group"
                  data-testid="link-copyright-instagram"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
                    <SiInstagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Follow Instagram</p>
                    <p className="text-[#EAF7FF]/40 text-xs">@devicesdoctor1993</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/share/17wypKXAtc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00C2FF]/20 bg-[#0A1A3F]/60 hover:border-[#00C2FF]/50 transition-all group"
                  data-testid="link-copyright-facebook"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center">
                    <SiFacebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Follow Facebook</p>
                    <p className="text-[#EAF7FF]/40 text-xs">Devices Doctor</p>
                  </div>
                </a>

                <a
                  href="mailto:devicesdoctor1993@gmail.com"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#00C2FF]/20 bg-[#0A1A3F]/60 hover:border-[#00C2FF]/50 transition-all group"
                  data-testid="link-copyright-email"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#00FFE0] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0A1A3F]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Email ID</p>
                    <p className="text-[#EAF7FF]/40 text-xs">devicesdoctor1993@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
