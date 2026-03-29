import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getBrandBySlug, allBrands } from "@/lib/brands-data";
import { ArrowLeft, CheckCircle2, Shield, Clock, Wrench, MapPin, Phone, MessageCircle, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import type { BrandModel } from "@shared/schema";
import { usePageMeta } from "@/hooks/use-page-meta";

const problemImages: Record<string, string> = {
  "Screen Replacement": "/images/svc-screen.jpg",
  "Battery Replacement": "/images/svc-battery.jpg",
  "Charging Port Repair": "/images/svc-charging.jpg",
  "Camera Repair": "/images/svc-camera.jpg",
  "Water Damage": "/images/svc-water.jpg",
  "Software Issue": "/images/svc-software.jpg",
  "Glyph Interface Repair": "/images/svc-screen.jpg",
};

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = getBrandBySlug(slug || "");

  usePageMeta(
    brand
      ? `${brand.name} Repair Mumbai | Screen, Battery & More | Devices Doctor`
      : "Brand Repair | Devices Doctor",
    brand
      ? `${brand.tagline}. Doorstep repair for all ${brand.name} models in Mumbai. Genuine parts, 3-6 months warranty. Book now!`
      : "Expert doorstep mobile repair service by Devices Doctor in Mumbai."
  );

  const { data: customModels = [] } = useQuery<BrandModel[]>({
    queryKey: ["/api/brand-models", slug],
    enabled: !!slug,
  });

  const allModels = [
    ...(brand?.popularModels || []),
    ...customModels.map((m) => m.modelName).filter(
      (name) => !brand?.popularModels.includes(name)
    ),
  ];

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#0A1A3F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Brand Not Found</h1>
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

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden" data-testid="section-brand-hero">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${brand.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/70 via-[#0A1A3F]/50 to-[#0A1A3F]" />
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#00C2FF]/8 rounded-full blur-[120px]" />
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2.5 sm:p-3 shrink-0">
                <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
              </div>
              <div className="self-start inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10">
                <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-pulse" />
                <span className="text-[#00C2FF] text-xs sm:text-sm font-medium">Authorized Repair Center</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
              {brand.name} <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Repair</span>
            </h1>
            <p className="text-[#EAF7FF]/70 text-base sm:text-xl max-w-2xl mb-3 sm:mb-4">{brand.tagline}</p>
            <p className="text-[#EAF7FF]/50 text-sm sm:text-base max-w-3xl mb-6 sm:mb-8">{brand.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/918169701980?text=Hi%2C%20I%20need%20${encodeURIComponent(brand.name)}%20repair`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold shadow-[0_0_25px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate" data-testid="button-brand-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" /> Book via WhatsApp
                </Button>
              </a>
              <a href="tel:8169701980">
                <Button size="lg" variant="outline" className="border-[#00C2FF]/40 text-[#00C2FF] bg-[#00C2FF]/5 no-default-hover-elevate no-default-active-elevate" data-testid="button-brand-call">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]" data-testid="section-brand-models">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00C2FF]" />
              <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Popular Models</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Models We Repair</h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {allModels.map((model, i) => (
              <motion.div
                key={model}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-[#00C2FF]/20 bg-[#0d2255]/50 text-white text-xs sm:text-sm font-medium"
                data-testid={`badge-model-${i}`}
              >
                {model}
              </motion.div>
            ))}
            <div className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-[#00FFE0]/20 bg-[#00FFE0]/5 text-[#00FFE0] text-xs sm:text-sm font-medium">
              + All Other Models
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#0A1A3F]" data-testid="section-brand-problems">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00C2FF]" />
              <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Repair Services</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white">{brand.name} Repair Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {brand.problems.map((problem, index) => (
              <motion.div
                key={problem.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/60 to-[#0A1A3F]/80 overflow-hidden hover:border-[#00C2FF]/40 transition-all duration-300"
                data-testid={`card-brand-problem-${index}`}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={problemImages[problem.name] || "/images/svc-screen.jpg"}
                    alt={problem.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/50 to-transparent" />
                </div>
                <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-1">{problem.name}</h3>
                <p className="text-[#EAF7FF]/50 text-sm mb-4">{problem.description}</p>
                <a
                  href={`https://wa.me/918169701980?text=Hi%2C%20I%20need%20${encodeURIComponent(problem.name)}%20for%20${encodeURIComponent(brand.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold text-sm no-default-hover-elevate no-default-active-elevate" data-testid={`button-book-problem-${index}`}>
                    Book Now <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#071533]" data-testid="section-brand-trust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, title: "30 Min Service", desc: "Doorstep repair within 30 minutes" },
              { icon: Shield, title: "3 to 6 Months Warranty", desc: "All repairs backed by warranty" },
              { icon: CheckCircle2, title: "Genuine Parts", desc: "OEM quality certified parts" },
              { icon: Star, title: "4.9 Rating", desc: "500+ happy customers" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-5 rounded-xl border border-[#00C2FF]/10 bg-[#0d2255]/40"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#00FFE0]/10 border border-[#00C2FF]/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#00C2FF]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{item.title}</h3>
                  <p className="text-[#EAF7FF]/50 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A1A3F]" data-testid="section-brand-other">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-white mb-6">Other Brands We Repair</h3>
          <div className="flex flex-wrap gap-2">
            {allBrands.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`}>
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#00C2FF]/15 bg-[#0d2255]/30 text-[#EAF7FF]/70 text-sm hover:border-[#00C2FF]/40 hover:text-white transition-all cursor-pointer" data-testid={`link-other-brand-${b.slug}`}>
                  {b.name} <ChevronRight className="w-3 h-3" />
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
