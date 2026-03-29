import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard, FileText, Image, Star, Calendar, Phone, Info, Mail,
  Settings, LogOut, Menu, X, ChevronRight, Wrench, Shield, ScrollText, Smartphone, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import AdminLogin from "./admin-login";
import logoPath from "@assets/WhatsApp_Image_2026-03-02_at_2.24.37_PM_1772459749185.jpeg";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Section", href: "/admin/hero", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "CTA Section", href: "/admin/cta", icon: Phone },
  { label: "About Page", href: "/admin/about", icon: Info },
  { label: "Contact Page", href: "/admin/contact", icon: Mail },
  { label: "Footer", href: "/admin/footer", icon: Settings },
  { label: "Privacy Policy", href: "/admin/privacy", icon: Shield },
  { label: "Terms & Conditions", href: "/admin/terms", icon: ScrollText },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
  { label: "Brand Models", href: "/admin/brand-models", icon: Smartphone },
  { label: "Images", href: "/admin/images", icon: Image },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: admin, isLoading, error } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    window.location.href = "/admin/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1A3F] flex items-center justify-center">
        <div className="text-[#00C2FF] text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !admin) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#0A1A3F] flex">
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#071533] border-r border-[#00C2FF]/15 transform transition-transform lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between p-4 border-b border-[#00C2FF]/15">
          <Link href="/admin">
            <span className="flex items-center gap-2 cursor-pointer">
              <img src={logoPath} alt="Devices Doctor" className="h-8 w-auto object-contain mix-blend-lighten" />
              <div>
                <div className="text-white text-sm font-bold">Admin Panel</div>
                <div className="text-[#00C2FF] text-[10px]">Devices Doctor</div>
              </div>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30"
                      : "text-[#EAF7FF]/60 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                  data-testid={`nav-admin-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#00C2FF]/15">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] text-sm font-bold">
              {(admin as any)?.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <div className="text-white text-sm font-medium">{(admin as any)?.username}</div>
              <div className="text-[#EAF7FF]/40 text-xs">Administrator</div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10 text-sm"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full mt-2 border-[#00C2FF]/30 text-[#00C2FF] bg-transparent hover:bg-[#00C2FF]/10 text-sm"
              data-testid="button-view-site"
            >
              View Website
            </Button>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-[#071533]/80 backdrop-blur border-b border-[#00C2FF]/15 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white" data-testid="button-admin-menu">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-white font-semibold text-lg">
            {navItems.find((n) => n.href === location || (n.href !== "/admin" && location.startsWith(n.href)))?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
