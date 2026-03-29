import { motion } from "framer-motion";

import deviceIphone16ProPath from "@assets/device-iphone16pro.png";
import deviceSmartWatchPath from "@assets/device-smartwatch.png";
import deviceMacbookPath from "@assets/device-macbook.png";
import deviceIpadProPath from "@assets/device-ipad-pro.png";

const specialities = [
  { image: deviceIphone16ProPath, label: "All Mobile Brands", desc: "iPhone, Samsung, OnePlus, Xiaomi & more" },
  { image: deviceSmartWatchPath, label: "Smart Watches", desc: "Apple Watch, Samsung Galaxy & more" },
  { image: deviceMacbookPath, label: "Laptops", desc: "HP, Dell, Lenovo, MacBook & more" },
  { image: deviceIpadProPath, label: "Tablets & iPads", desc: "iPad, Samsung Tab, Surface & more" },
];

export default function SpecialitiesSection() {
  return (
    <section className="relative py-12 sm:py-20 bg-[#0A1A3F]" data-testid="section-specialities">
      <div className="absolute inset-0 bg-neon-glow opacity-30" />
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
            <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Our Specialities</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Devices We Repair</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {specialities.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-xl border border-[#00C2FF]/20 bg-gradient-to-br from-[#0d2255]/80 to-[#0A1A3F]/90 overflow-hidden transition-all duration-300 hover:border-[#00C2FF]/50 hover:shadow-[0_0_30px_rgba(0,194,255,0.15)]"
              data-testid={`card-speciality-${index}`}
            >
              <div className="relative h-36 sm:h-44 lg:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/60 to-transparent" />
              </div>
              <div className="relative z-10 p-3 sm:p-4 lg:p-5 -mt-6">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">{item.label}</h3>
                <p className="text-[#EAF7FF]/50 text-[11px] sm:text-xs lg:text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
