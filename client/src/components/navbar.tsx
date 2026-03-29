import { useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useContent } from "@/hooks/use-content";
import logoPath from "@assets/WhatsApp_Image_2026-03-02_at_2.24.37_PM_1772459749185.jpeg";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Brands", href: "/brands" },
  { label: "Areas", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Copyright", href: "/copyright" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [location] = useLocation();
  const { get } = useContent("cta");

  const phone = get("phone", "8169701980");
  const phoneDisplay = get("phone_display", "8169-701980");
  const whatsapp = get("whatsapp_number", "918169701980");

  const isLegalActive = legalLinks.some((l) => l.href === location);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1A3F]/95 backdrop-blur-md border-b border-[#00C2FF]/20" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-14 sm:h-16 md:h-20">
          <Link href="/">
            <span className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer" data-testid="link-logo">
              <img
                src={logoPath}
                alt="Devices Doctor"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain mix-blend-lighten"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg font-bold text-white tracking-wide leading-tight">DEVICES</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#00C2FF] tracking-[0.2em] leading-tight">DOCTOR</span>
              </div>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <span
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    location === link.href
                      ? "text-[#00C2FF] bg-[#00C2FF]/10"
                      : "text-[#EAF7FF]/80 hover:text-[#00C2FF]"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setLegalOpen(true)}
              onMouseLeave={() => setLegalOpen(false)}
            >
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1 ${
                  isLegalActive
                    ? "text-[#00C2FF] bg-[#00C2FF]/10"
                    : "text-[#EAF7FF]/80 hover:text-[#00C2FF]"
                }`}
                data-testid="link-nav-more"
              >
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${legalOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {legalOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-[#00C2FF]/20 bg-[#0A1A3F]/98 backdrop-blur-lg shadow-xl shadow-black/30 overflow-hidden"
                  >
                    {legalLinks.map((link) => (
                      <Link key={link.label} href={link.href}>
                        <span
                          className={`block px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            location === link.href
                              ? "text-[#00C2FF] bg-[#00C2FF]/10"
                              : "text-[#EAF7FF]/80 hover:text-[#00C2FF] hover:bg-[#00C2FF]/5"
                          }`}
                          onClick={() => setLegalOpen(false)}
                          data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-[#00FFE0] text-sm font-semibold" data-testid="link-call">
              <Phone className="w-4 h-4" />
              {phoneDisplay}
            </a>
            <a href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%20need%20a%20device%20repair`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold text-sm no-default-hover-elevate no-default-active-elevate" data-testid="button-book-now-nav">
                Book Repair
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A1A3F]/98 border-t border-[#00C2FF]/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {mainLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <span
                    className={`block px-4 py-3 font-medium rounded-lg transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-[#00C2FF] bg-[#00C2FF]/10"
                        : "text-[#EAF7FF] hover:bg-[#00C2FF]/10"
                    }`}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="border-t border-[#00C2FF]/10 my-2 pt-2">
                <p className="px-4 py-1 text-[#EAF7FF]/40 text-xs font-semibold uppercase tracking-wider">Legal</p>
                {legalLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    <span
                      className={`block px-4 py-3 font-medium rounded-lg transition-colors cursor-pointer ${
                        location === link.href
                          ? "text-[#00C2FF] bg-[#00C2FF]/10"
                          : "text-[#EAF7FF] hover:bg-[#00C2FF]/10"
                      }`}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 text-[#00FFE0] font-semibold py-3">
                  <Phone className="w-4 h-4" /> Call Now: {phoneDisplay}
                </a>
                <a href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%20need%20a%20device%20repair`} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold no-default-hover-elevate no-default-active-elevate">
                    Book Repair Now
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
