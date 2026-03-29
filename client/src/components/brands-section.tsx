import { motion } from "framer-motion";
import { allBrands } from "@/lib/brands-data";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function BrandsSection() {
  return (
    <section id="brands" className="relative py-12 sm:py-20 bg-[#071533]" data-testid="section-brands">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00C2FF]" />
            <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">All Brands</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Brands We Repair</h2>
          <p className="text-[#EAF7FF]/60 max-w-2xl mx-auto">We repair all major brands. Select your brand for specialized repair services.</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
          {allBrands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
            >
              <Link href={`/brands/${brand.slug}`}>
                <div
                  className="group relative rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/50 to-[#0A1A3F]/70 p-4 sm:p-5 text-center hover:border-[#00C2FF]/50 hover:shadow-[0_0_25px_rgba(0,194,255,0.12)] transition-all duration-300 cursor-pointer"
                  data-testid={`card-brand-${brand.slug}`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00C2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-colors duration-300 overflow-hidden p-2">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="w-full h-full object-contain"
                        
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<span class="text-white font-bold text-lg">${brand.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <h3 className="text-white font-semibold text-xs sm:text-sm truncate">{brand.name}</h3>
                    <div className="flex items-center justify-center gap-0.5 mt-1 text-[#00C2FF]/60 group-hover:text-[#00C2FF] transition-colors">
                      <span className="text-[10px]">Repair</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
