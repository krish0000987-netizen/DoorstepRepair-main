import { useQuery } from "@tanstack/react-query";
import { Calendar, Star, Wrench, FileText, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: bookings = [] } = useQuery({ queryKey: ["/api/admin/bookings"] });
  const { data: reviews = [] } = useQuery({ queryKey: ["/api/admin/reviews"] });
  const { data: services = [] } = useQuery({ queryKey: ["/api/admin/services"] });
  const { data: content = [] } = useQuery({ queryKey: ["/api/content"] });

  const stats = [
    { label: "Total Bookings", value: (bookings as any[]).length, icon: Calendar, color: "from-blue-500 to-cyan-500", href: "/admin/bookings" },
    { label: "Reviews", value: (reviews as any[]).length, icon: Star, color: "from-yellow-500 to-orange-500", href: "/admin/reviews" },
    { label: "Services", value: (services as any[]).length, icon: Wrench, color: "from-green-500 to-emerald-500", href: "/admin/services" },
    { label: "Content Items", value: (content as any[]).length, icon: FileText, color: "from-purple-500 to-pink-500", href: "/admin/hero" },
  ];

  const pendingBookings = (bookings as any[]).filter((b: any) => b.status === "pending");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4 sm:p-6 hover:border-[#00C2FF]/40 transition-colors cursor-pointer" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-[#EAF7FF]/50 text-sm mt-1">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {pendingBookings.length > 0 && (
        <div className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00C2FF]" /> Recent Pending Bookings
          </h2>
          <div className="space-y-3">
            {pendingBookings.slice(0, 5).map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0A1A3F]/60 border border-[#00C2FF]/10">
                <div>
                  <div className="text-white font-medium text-sm">{booking.customerName}</div>
                  <div className="text-[#EAF7FF]/50 text-xs">{booking.brand} {booking.deviceType} - {booking.problem}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#00C2FF] text-xs">{booking.scheduledDate}</div>
                  <div className="text-[#EAF7FF]/40 text-xs">{booking.city}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/bookings">
            <span className="text-[#00C2FF] text-sm mt-4 inline-block hover:underline cursor-pointer">View all bookings →</span>
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Edit Hero Section", desc: "Title, subtitle, buttons", href: "/admin/hero", icon: FileText },
          { label: "Edit CTA Section", desc: "Phone, tagline, features", href: "/admin/cta", icon: MessageCircle },
          { label: "Edit About Page", desc: "Stats, mission, values", href: "/admin/about", icon: FileText },
          { label: "Edit Contact Page", desc: "Phone, email, hours", href: "/admin/contact", icon: FileText },
          { label: "Edit Footer", desc: "Links, social, copyright", href: "/admin/footer", icon: FileText },
          { label: "Manage Images", desc: "Upload & manage images", href: "/admin/images", icon: FileText },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4 hover:border-[#00C2FF]/40 transition-colors cursor-pointer" data-testid={`link-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
              <item.icon className="w-5 h-5 text-[#00C2FF] mb-2" />
              <div className="text-white font-medium text-sm">{item.label}</div>
              <div className="text-[#EAF7FF]/40 text-xs mt-1">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
