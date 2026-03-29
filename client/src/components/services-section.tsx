import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import svcMotherboardImg from "@assets/svc-motherboard.png";
import svcBackglassImg from "@assets/svc-backglass.png";
import svcBackpanelImg from "@assets/svc-backpanel.png";
import svcDiagnosisImg from "@assets/svc-diagnosis.png";

const services = [
  { image: "/images/svc-screen.jpg", name: "Screen Replacement", slug: "screen-replacement", desc: "Cracked or broken screen? We replace with original quality displays." },
  { image: "/images/svc-battery.jpg", name: "Battery Replacement", slug: "battery-replacement", desc: "Battery draining fast? Get genuine battery replacement." },
  { image: "/images/svc-charging.jpg", name: "Charging Issues", slug: "charging-issues", desc: "Not charging? We fix charging ports and connectors." },
  { image: "/images/svc-software.jpg", name: "Software Problems", slug: "software-problems", desc: "Hang, slow, or virus? Complete software repair." },
  { image: "/images/svc-water.jpg", name: "Water Damage Treatment", slug: "water-damage", desc: "Phone fell in water? Emergency water damage repair." },
  { image: "/images/svc-camera.jpg", name: "Camera & Speaker Repair", slug: "camera-speaker-repair", desc: "Blurry camera or no sound? We fix it all." },
  { image: svcMotherboardImg, name: "Motherboard Repairing", slug: "motherboard-repairing", desc: "Dead phone or restart issues? Expert motherboard level repair." },
  { image: svcBackglassImg, name: "iPhone Back Glass", slug: "iphone-back-glass", desc: "Cracked back glass on your iPhone? We replace it with precision." },
  { image: svcBackpanelImg, name: "Android Back Panel", slug: "android-back-panel", desc: "Broken back panel? Get a brand new replacement for your Android." },
  { image: svcDiagnosisImg, name: "Diagnosis", slug: "diagnosis", desc: "Not sure what's wrong? Our experts will diagnose and find the issue." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-12 sm:py-20 bg-[#071533]" data-testid="section-services">
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
            <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Our Specialities</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Expert Repair Services</h2>
          <p className="text-[#EAF7FF]/60 max-w-2xl mx-auto">Professional repair services for all your devices with genuine parts and warranty</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {services.map((service, index) => (
            <Link key={service.name} href={`/services/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group relative rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/60 to-[#0A1A3F]/80 overflow-hidden transition-all duration-300 hover:border-[#00C2FF]/40 hover:shadow-[0_0_25px_rgba(0,194,255,0.1)] cursor-pointer h-full"
                data-testid={`card-service-${index}`}
              >
                <div className="relative h-28 sm:h-32 lg:h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/70 to-[#0A1A3F]/20" />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1 flex items-center gap-1">
                    {service.name}
                    <ChevronRight className="w-3.5 h-3.5 text-[#00C2FF]/50 group-hover:text-[#00C2FF] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </h3>
                  <p className="text-[#EAF7FF]/50 text-xs sm:text-sm leading-relaxed line-clamp-2">{service.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
