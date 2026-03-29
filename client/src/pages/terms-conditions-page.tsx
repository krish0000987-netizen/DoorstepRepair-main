import { motion } from "framer-motion";
import { CheckCircle2, Shield, AlertTriangle, CreditCard, Package, Truck } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function TermsConditionsPage() {
  usePageMeta(
    "Terms & Conditions | Devices Doctor",
    "Read the terms and conditions for using Devices Doctor's doorstep mobile repair services in Mumbai. Service warranty, pricing, and booking policies."
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-terms-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C2FF]/5 to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF] text-xs font-semibold tracking-wider mb-4">
              LEGAL
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-terms-title">
              Terms & <span className="text-[#00C2FF]">Conditions</span>
            </h1>
            <p className="text-[#EAF7FF]/60 max-w-2xl mx-auto" data-testid="text-terms-subtitle">
              Please read our terms of service, warranty policy, and service charges carefully.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24" data-testid="section-terms-content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0D2247]/60 border border-[#00C2FF]/10 rounded-2xl p-6 sm:p-10 space-y-8"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-warranty-charges">
                <Shield className="w-6 h-6 text-[#00C2FF] shrink-0" />
                Is there any extra charges to claim the warranty on the parts repaired by Devices Doctor?
              </h2>
              <div className="text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>If the problem in the replaced part is informed within 24 hours after replacement, then no extra charges will be applicable. If the problem is reported after that, we will arrange a revisit and Rs.499 will be applicable as technician visit charge in case of onsite servicing.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-warranty-covered">
                <CheckCircle2 className="w-6 h-6 text-[#00FFE0] shrink-0" />
                Warranty Covered on Screen Replacement?
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2 text-[#EAF7FF]/70 text-sm sm:text-base">
                <li>Touch not working</li>
                <li>Touch slow working</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-warranty-not-covered">
                <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
                What is not covered under warranty?
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2 text-[#EAF7FF]/70 text-sm sm:text-base">
                <li>Water damage / Physical damage</li>
                <li>Blank Screen / Reflector Issue</li>
                <li>Any internal hardware damage</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-payment">
                <CreditCard className="w-6 h-6 text-[#00C2FF] shrink-0" />
                How can I make payment?
              </h2>
              <div className="text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>You can make payment via cash, Paytm, Google Pay, PhonePe or online payment after the repair is completed.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-faulty-parts">
                <Package className="w-6 h-6 text-[#00C2FF] shrink-0" />
                Replace Faulty Parts
              </h2>
              <div className="text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>Replaced faulty parts must be submitted to our technician after repair/services of your device, otherwise warranty will not be covered.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3" data-testid="text-terms-service-charges">
                <Truck className="w-6 h-6 text-[#00C2FF] shrink-0" />
                Service/Visit Charges
              </h2>
              <div className="text-[#EAF7FF]/70 text-sm sm:text-base leading-relaxed">
                <p>A minimum service/visit charge of Rs.499/- has to be paid in case of denial to repair, job not completed, or estimate cost not approved.</p>
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
