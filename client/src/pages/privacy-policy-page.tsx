import { motion } from "framer-motion";
import { Shield, FileText, Eye, Users, Database } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function PrivacyPolicyPage() {
  usePageMeta(
    "Privacy Policy | Devices Doctor",
    "Read Devices Doctor's privacy policy. We are committed to protecting your personal information and data privacy when using our doorstep mobile repair services."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-privacy-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-xs font-semibold tracking-wider mb-4">
              LEGAL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-privacy-title">
              Privacy <span className="text-[#00C2FF]">Policy</span>
            </h1>
            <p className="text-[#EAF7FF]/60 max-w-2xl mx-auto" data-testid="text-privacy-subtitle">
              Privacy Policy – Devices Doctor
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24" data-testid="section-privacy-content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0D2247]/60 border border-[#00C2FF]/10 rounded-2xl p-6 sm:p-10 space-y-8"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-privacy-section-1">
                <FileText className="w-6 h-6 text-[#00C2FF] shrink-0" />
                What is this privacy notice for?
              </h2>
              <div className="space-y-4 text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>We may handle your personal data in connection with your use of the Platform. This privacy notice sets out, for the Platform, our collection and sharing practices, the uses to which personal data is put, the ways in which we protect it in accordance with data protection and your privacy rights. Please read it carefully. This statement applies to personal data processed by Devices Doctor when you:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Visit our website and/or any other website(s) which reference or link to this statement (collectively).</li>
                  <li>Use, download, access, as applicable, any of our various internet-based offerings, including mobile platforms, software, or applications.</li>
                  <li>Receive communications from us, including emails, phone calls, or other electronic messages or data we collect.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-privacy-section-2">
                <Database className="w-6 h-6 text-[#00C2FF] shrink-0" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>We collect some information directly from you (for example, via forms you complete on our website or otherwise obtain). Such information is generally limited to:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Name, Contact Details, Email ID, IMEI, Device Details</li>
                  <li>Your communications with Devices Doctor personally</li>
                  <li>Information you provide on the website, such as online questionnaires or feedback forms</li>
                  <li>Information you provide when you subscribe to SMS services</li>
                  <li>Information you provide when you create your account, log-in credentials, and information about your use of and preferences for the services</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-privacy-section-3">
                <Eye className="w-6 h-6 text-[#00C2FF] shrink-0" />
                Indirect Information
              </h2>
              <div className="space-y-4 text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>Other information is received indirectly from you via use of the services (for example, from observing your actions on the website or any account access).</p>
              </div>
            </div>

            <div className="border-t border-[#00C2FF]/10 pt-6">
              <p className="text-[#00C2FF] font-semibold text-sm sm:text-base text-center">
                Devices Doctor – Trusted Mobile Repair Services
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
