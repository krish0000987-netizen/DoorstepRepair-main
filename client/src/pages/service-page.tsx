import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { getServiceBySlug, allBrands, serviceDetails } from "@/lib/brands-data";
import { ArrowLeft, CheckCircle2, Shield, Clock, Phone, MessageCircle, ChevronRight, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#00C2FF]/15 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        data-testid={`button-faq-${q.slice(0, 20).replace(/\s/g, "-")}`}
      >
        <span className="text-white font-semibold text-sm">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#00C2FF] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-5 pb-5"
        >
          <p className="text-[#EAF7FF]/60 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  usePageMeta(
    service
      ? `${service.name} | Doorstep Repair Mumbai | Devices Doctor`
      : "Repair Service | Devices Doctor",
    service
      ? `${service.description} Expert doorstep ${service.name.toLowerCase()} service across all Mumbai areas. Genuine parts, warranty included.`
      : "Expert doorstep mobile repair service by Devices Doctor in Mumbai."
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A1A3F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold no-default-hover-elevate no-default-active-elevate" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-service-hero">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/60 via-[#0A1A3F]/50 to-[#0A1A3F]" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <span className="inline-flex items-center gap-1 text-[#00C2FF] text-sm font-medium mb-6 hover:text-[#00FFE0] transition-colors cursor-pointer" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
              {service.name.split(" ")[0]}{" "}
              <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">
                {service.name.split(" ").slice(1).join(" ") || "Service"}
              </span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-sm sm:text-lg max-w-3xl mb-4">{service.description}</p>

            {service.slug === "diagnosis" && (
              <div className="rounded-xl border border-[#00FFE0]/30 bg-[#00FFE0]/5 px-5 py-4 mb-4 max-w-3xl">
                <p className="text-[#00FFE0] font-semibold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 inline mr-2" />
                  If the customer repairs the device, there are NO diagnosis charges. Diagnosis charges apply only if the customer opts for diagnosis only without repair.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/918169701980?text=Hi%2C%20I%20need%20${encodeURIComponent(service.name)}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold shadow-[0_0_25px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate" data-testid="button-service-book">
                  <MessageCircle className="w-5 h-5 mr-2" /> Book This Service
                </Button>
              </a>
              <a href="tel:8169701980">
                <Button size="lg" variant="outline" className="border-[#00C2FF]/40 text-[#00C2FF] bg-[#00C2FF]/5 no-default-hover-elevate no-default-active-elevate" data-testid="button-service-call">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]" data-testid="section-service-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-[#00C2FF]/10 bg-[#0d2255]/40"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#00FFE0] shrink-0" />
                    <span className="text-white text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#00C2FF]/20 shadow-[0_0_40px_rgba(0,194,255,0.1)]">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  className="w-full h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071533] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-service-brands">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Brands We Cover</h2>
          <p className="text-[#EAF7FF]/50 mb-8">Select your brand for {service.name.toLowerCase()} details</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBrands.map((brand, i) => {
              const problemMatch = brand.problems.find(
                (p) => p.name.toLowerCase() === service.name.toLowerCase() ||
                  service.name.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())
              );
              return (
                <motion.div
                  key={brand.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/brands/${brand.slug}`}>
                    <div className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 hover:border-[#00C2FF]/40 transition-all cursor-pointer" data-testid={`card-brand-${brand.slug}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden p-1.5">
                          <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">{brand.name}</h3>
                          <p className="text-[#EAF7FF]/40 text-xs">{service.name}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#00C2FF]/50 group-hover:text-[#00C2FF]" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#071533]" data-testid="section-service-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-service-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-[#EAF7FF]/60 mb-8">Book now and get your device repaired at your doorstep within 30 minutes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/918169701980?text=Hi%2C%20I%20need%20${encodeURIComponent(service.name)}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold px-8 shadow-[0_0_30px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate" data-testid="button-service-cta">
                Book {service.name} Now
              </Button>
            </a>
            <a href="tel:8169701980">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00C2FF]/40 text-[#00C2FF] bg-[#00C2FF]/5 px-8 no-default-hover-elevate no-default-active-elevate">
                <Phone className="w-5 h-5 mr-2" /> 8169-701980
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#071533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-white mb-6">Other Services</h3>
          <div className="flex flex-wrap gap-2">
            {serviceDetails.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#00C2FF]/15 bg-[#0d2255]/30 text-[#EAF7FF]/70 text-sm hover:border-[#00C2FF]/40 hover:text-white transition-all cursor-pointer" data-testid={`link-other-service-${s.slug}`}>
                  {s.name} <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
