import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href="tel:8169701980"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:shadow-[0_0_30px_rgba(0,194,255,0.6)] transition-shadow"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        data-testid="button-floating-call"
      >
        <Phone className="w-6 h-6 text-[#0A1A3F]" />
      </motion.a>
      <motion.a
        href="https://wa.me/918169701980?text=Hi%2C%20I%20need%20a%20device%20repair"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        data-testid="button-floating-whatsapp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0A1A3F] animate-pulse" />
      </motion.a>
    </div>
  );
}
