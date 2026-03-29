import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: blog, isLoading, error } = useQuery<any>({
    queryKey: ["/api/blogs", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) throw new Error("Blog not found");
      return res.json();
    },
  });

  usePageMeta(
    blog?.metaTitle || blog?.title || "Blog | Devices Doctor",
    blog?.metaDescription || blog?.excerpt || "Read expert repair tips and guides from Devices Doctor."
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1A3F]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <div className="w-12 h-12 border-2 border-[#00C2FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#EAF7FF]/50">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0A1A3F]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center">
          <BookOpen className="w-16 h-16 text-[#00C2FF]/30 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-[#EAF7FF]/50 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-[#00C2FF] hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />

      <article className="pt-20 sm:pt-24 pb-16">
        {blog.featuredImage && (
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A3F]/40 via-transparent to-[#0A1A3F]" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={blog.featuredImage ? "-mt-16 relative z-10" : "pt-8"}
          >
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 text-[#00C2FF]/70 hover:text-[#00C2FF] text-sm mb-6 cursor-pointer transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </span>
            </Link>

            <div className="bg-gradient-to-br from-[#0d2255]/80 to-[#071533]/90 border border-[#00C2FF]/15 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#EAF7FF]/50 mb-6 pb-6 border-b border-[#00C2FF]/10">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#00C2FF]" />
                  {blog.authorName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#00C2FF]" />
                  {blog.publishDate}
                </span>
              </div>

              {blog.excerpt && (
                <p className="text-[#EAF7FF]/70 text-lg leading-relaxed mb-6 font-medium border-l-2 border-[#00C2FF]/40 pl-4">
                  {blog.excerpt}
                </p>
              )}

              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-[#EAF7FF]/75 prose-p:leading-relaxed
                  prose-a:text-[#00C2FF] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-em:text-[#EAF7FF]/80
                  prose-ul:text-[#EAF7FF]/75 prose-ol:text-[#EAF7FF]/75
                  prose-li:marker:text-[#00C2FF]
                  prose-blockquote:border-l-[#00C2FF] prose-blockquote:text-[#EAF7FF]/60
                  prose-code:text-[#00FFE0] prose-code:bg-[#00C2FF]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-[#0A1A3F] prose-pre:border prose-pre:border-[#00C2FF]/20
                  prose-img:rounded-xl prose-img:border prose-img:border-[#00C2FF]/15
                  prose-hr:border-[#00C2FF]/15"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            <div className="mt-8 text-center">
              <Link href="/blog">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold px-6 py-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                  <ArrowLeft className="w-4 h-4" /> Browse All Articles
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
