import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/use-content";

const slides = [
  {
    badge: "30-Minute Doorstep Repair",
    title1: "DEVICES",
    title2: "DOCTOR",
    subtitle: "Your Device Health Experts",
    highlight: "30 Minutes Doorstep Repair Service",
    description: "We Repair Onsite Within 30 Minutes! All Mobile Brands, Laptops, Tablets & Smart Watches.",
    image: "/images/hero-device.png",
  },
  {
    badge: "Screen Replacement",
    title1: "CRACKED",
    title2: "SCREEN?",
    subtitle: "Expert Screen Replacement",
    highlight: "Original Quality Display at Your Doorstep",
    description: "Professional screen replacement for all brands — iPhone, Samsung, OnePlus, Xiaomi & more. Genuine parts with 3 to 6 months warranty.",
    image: "/images/hero-device.png",
  },
  {
    badge: "Battery & Charging",
    title1: "BATTERY",
    title2: "ISSUES?",
    subtitle: "Battery & Charging Fix",
    highlight: "Genuine Battery Replacement in 30 Minutes",
    description: "Low battery life? Charging not working? Our certified technicians fix all battery and charging issues at your doorstep.",
    image: "/images/hero-device.png",
  },
  {
    badge: "All Devices Covered",
    title1: "LAPTOPS &",
    title2: "TABLETS",
    subtitle: "Complete Device Care",
    highlight: "MacBook, HP, Dell, Lenovo & All Brands",
    description: "Not just mobiles — we repair laptops, tablets, smart watches & all electronic devices at your location.",
    image: "/images/hero-device.png",
  },
  {
    badge: "Water Damage Recovery",
    title1: "WATER",
    title2: "DAMAGE?",
    subtitle: "Emergency Water Damage Repair",
    highlight: "Don't Panic — Call Us Immediately!",
    description: "Fast water damage treatment to save your device. Component-level cleaning and repair by expert technicians.",
    image: "/images/hero-device.png",
  },
];

export default function HeroSection() {
  const { get } = useContent("hero");
  const { get: getCta } = useContent("cta");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20" data-testid="section-hero">
      <div className="absolute inset-0 bg-[#0A1A3F]">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/60 via-transparent to-[#0A1A3F]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#00FFE0]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left min-h-[400px] sm:min-h-[420px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-pulse" />
                  <span className="text-[#00C2FF] text-sm font-medium">{current === 0 ? get("badge", slide.badge) : slide.badge}</span>
                </motion.div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  <span className="text-white">{current === 0 ? get("title_line1", slide.title1) : slide.title1}</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">{current === 0 ? get("title_line2", slide.title2) : slide.title2}</span>
                </h1>

                <p className="text-[#EAF7FF]/80 text-base sm:text-xl font-medium mb-2">
                  {current === 0 ? get("subtitle", slide.subtitle) : slide.subtitle}
                </p>
                <p className="text-[#00C2FF] text-lg sm:text-2xl font-bold mb-2">
                  {current === 0 ? get("highlight", slide.highlight) : slide.highlight}
                </p>
                <p className="text-[#EAF7FF]/60 text-sm sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  {current === 0 ? get("description", slide.description) : slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#booking">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold text-base px-8 shadow-[0_0_30px_rgba(0,194,255,0.3)] no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-hero-book"
                >
                  {get("button_primary", "Book Repair Now")} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href={`tel:${getCta("phone", "8169701980")}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#00FFE0]/40 text-[#00FFE0] font-semibold text-base px-8 bg-[#00FFE0]/5 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-hero-call"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
              <a
                href={`https://wa.me/${getCta("whatsapp_number", "918169701980")}?text=Hi%2C%20I%20need%20a%20device%20repair`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-[#25D366]/40 text-[#25D366] font-semibold text-base px-8 bg-[#25D366]/5 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-hero-whatsapp"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> {get("button_secondary", "WhatsApp")}
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2.5 bg-gradient-to-r from-[#00C2FF] to-[#00FFE0]"
                      : "w-2.5 h-2.5 bg-[#EAF7FF]/30 hover:bg-[#00C2FF]/50"
                  }`}
                  data-testid={`button-slide-${i}`}
                />
              ))}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-full border border-[#00C2FF]/30 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-colors"
                  data-testid="button-slide-prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 rounded-full border border-[#00C2FF]/30 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-colors"
                  data-testid="button-slide-next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border border-[#00C2FF]/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-64 h-64 rounded-full border border-[#00FFE0]/10 animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            <img
              src={get("hero_image", "/images/hero-device.png")}
              alt="Device repair"
              className="relative z-10 w-80 h-auto drop-shadow-[0_0_40px_rgba(0,194,255,0.3)]"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1A3F] to-transparent" />
    </section>
  );
}
