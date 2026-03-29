import { Phone, Mail, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Link } from "wouter";
import { useContent } from "@/hooks/use-content";
import logoPath from "@assets/WhatsApp_Image_2026-03-02_at_2.24.37_PM_1772459749185.jpeg";

const INSTAGRAM_URL = "https://www.instagram.com/devicesdoctor1993?igsh=aW9tY3hvMXRsdzF2";
const FACEBOOK_URL = "https://www.facebook.com/share/17wypKXAtc/";
const EMAIL = "devicesdoctor1993@gmail.com";

export default function Footer() {
  const { get } = useContent("footer");
  const { get: getCta } = useContent("cta");

  return (
    <footer className="bg-[#060f28] border-t border-[#00C2FF]/10 pt-10 sm:pt-16 pb-6 sm:pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 mb-10 sm:mb-12">

          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img
                src={logoPath}
                alt="Devices Doctor"
                className="h-16 sm:h-14 w-auto object-contain mix-blend-lighten"
              />
            </div>
            <p className="text-[#EAF7FF]/50 text-sm leading-relaxed mb-5">
              Fast & Trusted 30 Minutes Doorstep Repair Service for all your devices. Genuine parts with 3 to 6 months warranty.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-colors" data-testid="link-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-colors" data-testid="link-facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href={`mailto:${EMAIL}`} className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] hover:bg-[#00C2FF]/20 transition-colors" data-testid="link-email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                { label: "Screen Replacement", slug: "screen-replacement" },
                { label: "Battery Replacement", slug: "battery-replacement" },
                { label: "Charging Issues", slug: "charging-issues" },
                { label: "Software Problems", slug: "software-problems" },
                { label: "Water Damage", slug: "water-damage" },
                { label: "Camera Repair", slug: "camera-speaker-repair" },
                { label: "Motherboard Repairing", slug: "motherboard-repairing" },
                { label: "iPhone Back Glass", slug: "iphone-back-glass" },
                { label: "Android Back Panel", slug: "android-back-panel" },
                { label: "Diagnosis", slug: "diagnosis" },
              ].map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>
                    <span className="text-[#EAF7FF]/50 text-sm hover:text-[#00C2FF] transition-colors cursor-pointer">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "All Services", href: "/services" },
                { label: "All Brands", href: "/brands" },
                { label: "Service Areas", href: "/areas" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-[#EAF7FF]/50 text-sm hover:text-[#00C2FF] transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00C2FF] mt-0.5 shrink-0" />
                <a href={`tel:${get("phone", "8169701980")}`} className="text-[#EAF7FF]/70 text-sm hover:text-[#00C2FF] transition-colors">
                  {getCta("phone_display", "8169-701980")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00C2FF] mt-0.5 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="text-[#EAF7FF]/70 text-sm hover:text-[#00C2FF] transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00C2FF] mt-0.5 shrink-0" />
                <span className="text-[#EAF7FF]/50 text-sm">Mumbai, Thane, Navi Mumbai & more</span>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-[#00C2FF]/5 border border-[#00C2FF]/10">
              <p className="text-[#00C2FF] text-xs font-semibold mb-1">Follow Us</p>
              <div className="flex items-center gap-2">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#EAF7FF]/50 text-xs hover:text-[#00C2FF] transition-colors flex items-center gap-1.5" data-testid="link-instagram-contact">
                  <SiInstagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <span className="text-[#EAF7FF]/20">|</span>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-[#EAF7FF]/50 text-xs hover:text-[#00C2FF] transition-colors flex items-center gap-1.5" data-testid="link-facebook-contact">
                  <SiFacebook className="w-3.5 h-3.5" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#00C2FF]/10 pt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[#EAF7FF]/30 text-xs text-center sm:text-left">&copy; {new Date().getFullYear()} {get("copyright", "Devices Doctor. All rights reserved.")}</p>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
            <Link href="/privacy-policy">
              <span className="text-[#EAF7FF]/30 text-xs hover:text-[#00C2FF] transition-colors cursor-pointer" data-testid="link-privacy-policy">Privacy Policy</span>
            </Link>
            <Link href="/terms-conditions">
              <span className="text-[#EAF7FF]/30 text-xs hover:text-[#00C2FF] transition-colors cursor-pointer" data-testid="link-terms-conditions">Terms & Conditions</span>
            </Link>
            <Link href="/copyright">
              <span className="text-[#EAF7FF]/30 text-xs hover:text-[#00C2FF] transition-colors cursor-pointer" data-testid="link-copyright">Copyright</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
