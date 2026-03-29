import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/use-content";

export default function CTASection() {
  const { get } = useContent("cta");

  return (
    <section className="relative py-12 sm:py-20 bg-[#0A1A3F] overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0">
        <img
          src="/images/cta-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A3F] via-[#0A1A3F]/90 to-[#0A1A3F]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF]/8 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {get("title", "Need Help?")} <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">{get("title_highlight", "Call Now!")}</span>
          </h2>

          <a
            href={`tel:${get("phone", "8169701980")}`}
            className="inline-flex items-center gap-2 sm:gap-3 text-2xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 hover:text-[#00C2FF] transition-colors"
            data-testid="link-cta-phone"
          >
            <Phone className="w-6 h-6 sm:w-10 sm:h-10 text-[#00C2FF]" />
            {get("phone_display", "8169-701980")}
          </a>

          <p className="text-[#00C2FF] text-lg font-semibold mt-2 mb-8">{get("tagline", "Fast • Reliable • Trusted")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold text-base px-8 shadow-[0_0_30px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate"
                data-testid="button-cta-book"
              >
                Book Repair Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a
              href={`https://wa.me/${get("whatsapp_number", "918169701980")}?text=Hi%2C%20I%20need%20a%20device%20repair`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#00FFE0]/40 text-[#00FFE0] font-semibold text-base px-8 bg-[#00FFE0]/5 no-default-hover-elevate no-default-active-elevate"
                data-testid="button-cta-whatsapp"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[#EAF7FF]/50 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#00FFE0]" />
              Certified Technicians
            </div>
            <div className="flex items-center gap-2 text-[#EAF7FF]/50 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#00FFE0]" />
              Genuine Parts
            </div>
            <div className="flex items-center gap-2 text-[#EAF7FF]/50 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#00FFE0]" />
              3 to 6 Months Warranty
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
