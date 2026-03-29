import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { mumbaiAreas, regions, getAreasByRegion } from "@/lib/areas-data";

export default function CitiesSection() {
  return (
    <section id="areas" className="relative py-12 sm:py-20 bg-[#0A1A3F]" data-testid="section-areas">
      <div className="absolute inset-0 bg-neon-glow opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00C2FF]" />
            <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Service Areas</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Mumbai & <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Nearby Areas</span>
          </h2>
          <p className="text-[#EAF7FF]/60 mb-2">Doorstep repair service across {mumbaiAreas.length}+ locations in Mumbai, Thane, Navi Mumbai & surrounding regions</p>
        </motion.div>

        <div className="space-y-8">
          {regions.map((region, ri) => (
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.1, duration: 0.5 }}
              className="rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/40 to-[#0A1A3F]/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#00C2FF]" />
                <h3 className="text-white font-bold text-base">{region}</h3>
                <span className="text-[#EAF7FF]/30 text-xs">({getAreasByRegion(region).length} areas)</span>
              </div>
              <p className="text-[#EAF7FF]/60 text-sm leading-relaxed">
                {getAreasByRegion(region).map((area, i) => (
                  <span key={area.name}>
                    <span className={area.popular ? "text-[#00C2FF] font-medium" : ""}>{area.name}</span>
                    {i < getAreasByRegion(region).length - 1 && <span className="text-[#EAF7FF]/30"> • </span>}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/areas">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] font-semibold text-sm hover:bg-[#00C2FF]/20 transition-all cursor-pointer" data-testid="link-view-all-areas">
              View All {mumbaiAreas.length}+ Areas We Serve →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
