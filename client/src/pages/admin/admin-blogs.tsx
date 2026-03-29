import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Plus, Trash2, Edit2, Save, X, Eye, EyeOff, Upload, BookOpen,
  Bold, Italic, Underline, List, ListOrdered, Link2, Image as ImageIcon,
  Heading2, Heading3, Quote, Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const exec = (command: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) exec("insertHTML", `<img src="${url}" alt="Blog image" style="max-width:100%;border-radius:8px;margin:8px 0;" />`);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const toolbarBtn = (onClick: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded text-[#EAF7FF]/60 hover:text-white hover:bg-[#00C2FF]/15 transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className="border border-[#00C2FF]/20 rounded-lg overflow-hidden bg-[#0A1A3F]/80">
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-[#071533] border-b border-[#00C2FF]/15">
        {toolbarBtn(() => exec("bold"), <Bold className="w-4 h-4" />, "Bold")}
        {toolbarBtn(() => exec("italic"), <Italic className="w-4 h-4" />, "Italic")}
        {toolbarBtn(() => exec("underline"), <Underline className="w-4 h-4" />, "Underline")}
        <div className="w-px h-5 bg-[#00C2FF]/20 mx-1" />
        {toolbarBtn(() => exec("insertHTML", "<h2></h2>"), <Heading2 className="w-4 h-4" />, "Heading 2")}
        {toolbarBtn(() => exec("insertHTML", "<h3></h3>"), <Heading3 className="w-4 h-4" />, "Heading 3")}
        <div className="w-px h-5 bg-[#00C2FF]/20 mx-1" />
        {toolbarBtn(() => exec("insertUnorderedList"), <List className="w-4 h-4" />, "Bullet List")}
        {toolbarBtn(() => exec("insertOrderedList"), <ListOrdered className="w-4 h-4" />, "Numbered List")}
        {toolbarBtn(() => exec("insertHTML", "<blockquote></blockquote>"), <Quote className="w-4 h-4" />, "Quote")}
        {toolbarBtn(() => exec("insertHTML", "<code></code>"), <Code className="w-4 h-4" />, "Code")}
        <div className="w-px h-5 bg-[#00C2FF]/20 mx-1" />
        {toolbarBtn(insertLink, <Link2 className="w-4 h-4" />, "Insert Link")}
        {toolbarBtn(insertImageUrl, <ImageIcon className="w-4 h-4" />, "Insert Image URL")}
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${showPreview ? "bg-[#00C2FF]/20 text-[#00C2FF]" : "text-[#EAF7FF]/50 hover:text-white"}`}
        >
          <Eye className="w-3.5 h-3.5" />
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div
          className="min-h-[300px] p-4 text-[#EAF7FF]/80 prose prose-invert max-w-none
            prose-headings:text-white prose-p:text-[#EAF7FF]/75 prose-a:text-[#00C2FF]
            prose-strong:text-white prose-ul:text-[#EAF7FF]/75 prose-ol:text-[#EAF7FF]/75
            prose-li:marker:text-[#00C2FF] prose-blockquote:border-l-[#00C2FF]
            prose-img:rounded-xl prose-code:text-[#00FFE0] prose-code:bg-[#00C2FF]/10"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="min-h-[300px] p-4 text-white outline-none focus:ring-1 focus:ring-[#00C2FF]/30 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-[#EAF7FF]/80 [&_blockquote]:border-l-2 [&_blockquote]:border-[#00C2FF]/50 [&_blockquote]:pl-4 [&_blockquote]:text-[#EAF7FF]/60 [&_a]:text-[#00C2FF] [&_strong]:font-bold [&_code]:bg-[#00C2FF]/10 [&_code]:text-[#00FFE0] [&_code]:px-1 [&_code]:rounded [&_img]:max-w-full [&_img]:rounded-xl"
          data-placeholder="Write your blog content here..."
          style={{ caretColor: "#00C2FF" }}
        />
      )}
    </div>
  );
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  authorName: "Admin",
  publishDate: new Date().toISOString().split("T")[0],
  published: false,
  metaTitle: "",
  metaDescription: "",
  featuredImage: "",
};

export default function AdminBlogs() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: blogs = [], isLoading } = useQuery<any[]>({ queryKey: ["/api/admin/blogs"] });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
    queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editingId ? f.slug : generateSlug(title),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", form.slug);
    fd.append("excerpt", form.excerpt);
    fd.append("content", form.content);
    fd.append("authorName", form.authorName);
    fd.append("publishDate", form.publishDate);
    fd.append("published", String(form.published));
    fd.append("metaTitle", form.metaTitle);
    fd.append("metaDescription", form.metaDescription);
    if (form.featuredImage && !imageFile) fd.append("featuredImageUrl", form.featuredImage);
    if (imageFile) fd.append("featuredImage", imageFile);
    return fd;
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      const fd = buildFormData();
      const res = await fetch("/api/admin/blogs", { method: "POST", body: fd, credentials: "include" });
      if (!res.ok) throw new Error((await res.json()).message);
      return res.json();
    },
    onSuccess: () => {
      invalidate();
      resetForm();
      toast({ title: "Blog Created", description: "Your blog post has been saved." });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async (id: number) => {
      const fd = buildFormData();
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "PUT", body: fd, credentials: "include" });
      if (!res.ok) throw new Error((await res.json()).message);
      return res.json();
    },
    onSuccess: () => {
      invalidate();
      resetForm();
      toast({ title: "Blog Updated", description: "Blog post updated successfully." });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const publishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) =>
      apiRequest("PATCH", `/api/admin/blogs/${id}/publish`, { published }),
    onSuccess: () => {
      invalidate();
      toast({ title: "Status Updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/blogs/${id}`),
    onSuccess: () => {
      invalidate();
      toast({ title: "Deleted", description: "Blog post deleted." });
    },
  });

  const startEdit = (blog: any) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      authorName: blog.authorName || "Admin",
      publishDate: blog.publishDate || new Date().toISOString().split("T")[0],
      published: !!blog.published,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      featuredImage: blog.featuredImage || "",
    });
    setImageFile(null);
    setImagePreview(blog.featuredImage || "");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      toast({ title: "Required Fields Missing", description: "Please fill in title, slug, excerpt, and content.", variant: "destructive" });
      return;
    }
    if (editingId) updateMutation.mutate(editingId);
    else createMutation.mutate();
  };

  if (isLoading) return <div className="text-[#00C2FF] py-10 text-center">Loading blogs...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Blogs ({(blogs as any[]).length})</h2>
          <p className="text-[#EAF7FF]/50 text-sm mt-1">Create and manage blog posts for your website.</p>
        </div>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold"
          data-testid="button-add-blog"
        >
          <Plus className="w-4 h-4 mr-1" /> New Blog Post
        </Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#00C2FF]/20 bg-[#0d2255]/50 p-6 mb-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">{editingId ? "Edit Blog Post" : "New Blog Post"}</h3>
            <button onClick={resetForm} className="text-[#EAF7FF]/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Blog Title *</label>
              <Input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title..."
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white"
                data-testid="input-blog-title"
              />
            </div>

            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Slug (URL) *</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated-from-title"
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white font-mono text-sm"
                data-testid="input-blog-slug"
              />
              <p className="text-[#EAF7FF]/30 text-xs mt-1">URL: /blog/{form.slug || "your-slug"}</p>
            </div>

            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Author Name</label>
              <Input
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                placeholder="Admin"
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white"
                data-testid="input-blog-author"
              />
            </div>

            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Publish Date</label>
              <Input
                type="date"
                value={form.publishDate}
                onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white"
                data-testid="input-blog-date"
              />
            </div>

            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Status</label>
              <div className="flex items-center gap-3 h-10">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-[#00C2FF]" : "bg-[#00C2FF]/20"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className={`text-sm font-medium ${form.published ? "text-[#00C2FF]" : "text-[#EAF7FF]/50"}`}>
                  {form.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Short Excerpt / Description *</label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="A brief summary of the blog post (shown in cards)..."
              rows={3}
              className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white resize-none"
              data-testid="input-blog-excerpt"
            />
          </div>

          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Featured Image</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#00C2FF]/20 hover:border-[#00C2FF]/40 rounded-xl p-6 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-[#00C2FF]/40 mx-auto mb-2" />
                  <p className="text-[#EAF7FF]/50 text-sm">Click to upload featured image</p>
                  <p className="text-[#EAF7FF]/30 text-xs mt-1">JPG, PNG, WebP (max 5MB)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="mt-2">
                  <p className="text-[#EAF7FF]/40 text-xs mb-1">Or enter image URL:</p>
                  <Input
                    value={imageFile ? "" : form.featuredImage}
                    onChange={(e) => { setForm({ ...form, featuredImage: e.target.value }); setImageFile(null); setImagePreview(e.target.value); }}
                    placeholder="https://example.com/image.jpg or /uploads/..."
                    className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white text-sm"
                    disabled={!!imageFile}
                  />
                </div>
              </div>
              {(imagePreview || form.featuredImage) && (
                <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden border border-[#00C2FF]/20 shrink-0">
                  <img src={imagePreview || form.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(""); setForm({ ...form, featuredImage: "" }); }}
                    className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-1.5 block">Full Content * (Rich Text)</label>
            <RichTextEditor
              value={form.content}
              onChange={(v) => setForm({ ...form, content: v })}
            />
            <p className="text-[#EAF7FF]/30 text-xs mt-1">Use the toolbar to format text. You can also insert images by URL using the image button.</p>
          </div>

          <div className="border-t border-[#00C2FF]/10 pt-4">
            <h4 className="text-[#EAF7FF]/70 text-sm font-medium mb-3">SEO Settings (Optional)</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#EAF7FF]/50 text-xs mb-1 block">Meta Title</label>
                <Input
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  placeholder="SEO page title..."
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/15 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-[#EAF7FF]/50 text-xs mb-1 block">Meta Description</label>
                <Input
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  placeholder="SEO description (150-160 chars)..."
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/15 text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40"
              data-testid="button-save-blog"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingId ? "Update Post" : "Create Post"}
            </Button>
            <Button onClick={resetForm} variant="outline" className="border-[#00C2FF]/30 text-[#00C2FF] bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {(blogs as any[]).length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-[#00C2FF]/10 bg-[#0d2255]/20">
          <BookOpen className="w-12 h-12 text-[#00C2FF]/30 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">No blog posts yet</p>
          <p className="text-[#EAF7FF]/40 text-sm">Create your first post using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(blogs as any[]).map((blog: any) => (
            <div key={blog.id} className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4 flex gap-4" data-testid={`blog-row-${blog.id}`}>
              {blog.featuredImage && (
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                  <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="text-white font-semibold text-sm leading-tight flex-1">{blog.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${blog.published ? "bg-green-500/15 text-green-400" : "bg-[#EAF7FF]/5 text-[#EAF7FF]/40"}`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-[#EAF7FF]/50 text-xs mt-1 line-clamp-1">{blog.excerpt}</p>
                <div className="text-[#EAF7FF]/30 text-xs mt-1.5">
                  {blog.authorName} • {blog.publishDate} • /blog/{blog.slug}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-1.5 shrink-0">
                <button
                  onClick={() => publishMutation.mutate({ id: blog.id, published: !blog.published })}
                  title={blog.published ? "Unpublish" : "Publish"}
                  className={`p-1.5 rounded transition-colors ${blog.published ? "text-yellow-400 hover:bg-yellow-500/10" : "text-green-400 hover:bg-green-500/10"}`}
                  data-testid={`button-toggle-blog-${blog.id}`}
                >
                  {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEdit(blog)}
                  className="p-1.5 rounded text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-colors"
                  data-testid={`button-edit-blog-${blog.id}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { if (confirm("Delete this blog post?")) deleteMutation.mutate(blog.id); }}
                  className="p-1.5 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                  data-testid={`button-delete-blog-${blog.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
