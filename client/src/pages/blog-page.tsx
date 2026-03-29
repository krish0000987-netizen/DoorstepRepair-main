import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function BlogPage() {
  usePageMeta(
    "Blog | Tips, Guides & News | Devices Doctor",
    "Read the latest mobile repair tips, guides, and news from Devices Doctor. Expert advice on device care, repair services, and more."
  );

  const { data: blogs = [], isLoading } = useQuery<any[]>({ queryKey: ["/api/blogs"] });

  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F] via-[#071533] to-[#0A1A3F]" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00C2FF]/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00FFE0]/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-[#00C2FF]" />
              <span className="text-[#00C2FF] text-sm font-medium">Blog & Tips</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Expert <span className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] bg-clip-text text-transparent">Repair Tips</span> & Guides
            </h1>
            <p className="text-[#EAF7FF]/70 text-lg max-w-2xl mx-auto">
              Stay informed with the latest mobile repair tips, device care guides, and news from our expert technicians.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-[#071533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-[#00C2FF]/10 bg-[#0d2255]/40 overflow-hidden animate-pulse">
                  <div className="h-48 bg-[#00C2FF]/10" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#00C2FF]/10 rounded w-3/4" />
                    <div className="h-3 bg-[#00C2FF]/10 rounded w-full" />
                    <div className="h-3 bg-[#00C2FF]/10 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-[#00C2FF]/30 mx-auto mb-4" />
              <h2 className="text-white text-2xl font-bold mb-2">No Posts Yet</h2>
              <p className="text-[#EAF7FF]/50">Check back soon for expert tips and guides.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(blogs as any[]).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="group rounded-2xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/60 to-[#0A1A3F]/80 overflow-hidden hover:border-[#00C2FF]/40 hover:shadow-[0_0_30px_rgba(0,194,255,0.12)] transition-all duration-300 cursor-pointer h-full flex flex-col" data-testid={`blog-card-${blog.slug}`}>
                      <div className="relative h-48 overflow-hidden bg-[#0A1A3F]">
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00C2FF]/10 to-[#00FFE0]/5">
                            <BookOpen className="w-12 h-12 text-[#00C2FF]/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F]/60 to-transparent" />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#00C2FF] transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-[#EAF7FF]/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-[#00C2FF]/10">
                          <div className="flex items-center gap-3 text-xs text-[#EAF7FF]/40">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {blog.authorName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {blog.publishDate}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-[#00C2FF] text-xs font-medium group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
