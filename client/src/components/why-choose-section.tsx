import { motion } from "framer-motion";
import { Clock, Home, UserCheck, Shield, ThumbsUp, Award } from "lucide-react";

const reasons = [
  { icon: Clock, title: "30 Minutes Fast Service", desc: "We reach your doorstep within 30 minutes of booking" },
  { icon: Home, title: "Doorstep Repair", desc: "Repair at your home or office, no need to visit shops" },
  { icon: UserCheck, title: "Professional Technicians", desc: "Certified and experienced technicians" },
  { icon: Shield, title: "Genuine Quality Parts", desc: "We use only genuine OEM quality parts" },
  { icon: ThumbsUp, title: "Trusted Service", desc: "No hidden charges, complete transparency on every repair" },
  { icon: Award, title: "Service Warranty", desc: "3 to 6 months warranty on all repairs" },
];

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="relative py-12 sm:py-20 bg-[#0A1A3F]" data-testid="section-why-choose">
      <div className="absolute inset-0 bg-neon-glow opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00C2FF]" />
              <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Why Trust Devices Doctor?</h2>
            <p className="text-[#EAF7FF]/60 mb-8">Fast, Reliable, Trusted - Your device deserves the best care</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-[#00C2FF]/10 bg-[#0d2255]/40 hover:border-[#00C2FF]/30 transition-all duration-300"
                  data-testid={`card-reason-${index}`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-0.5">{item.title}</h3>
                    <p className="text-[#EAF7FF]/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#00C2FF]/20 shadow-[0_0_40px_rgba(0,194,255,0.1)]">
              <img
                src="/images/why-technician.jpg"
                alt="Professional technician repairing device"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <img
                        key={i}
                        src={`/images/technician-${i}.png`}
                        alt="Technician"
                        className="w-10 h-10 rounded-full border-2 border-[#0A1A3F] object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">50+ Certified Technicians</p>
                    <p className="text-[#00C2FF]/70 text-xs">Ready to serve at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
