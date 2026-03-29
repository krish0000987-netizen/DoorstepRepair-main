import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Upload, Image as ImageIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminImages() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const { data: content = [] } = useQuery({ queryKey: ["/api/content"] });
  const imageContent = (content as any[]).filter((c: any) => c.contentType === "image" || c.value?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i));

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData, credentials: "include" });
        const data = await res.json();
        if (data.url) {
          setUploadedImages((prev) => [data.url, ...prev]);
          toast({ title: "Uploaded!", description: `${file.name} uploaded successfully.` });
        }
      } catch {
        toast({ title: "Error", description: `Failed to upload ${file.name}`, variant: "destructive" });
      }
    }
    setUploading(false);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  const allImages = [...uploadedImages, ...imageContent.map((c: any) => c.value)].filter(Boolean);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Image Manager</h2>
        <p className="text-[#EAF7FF]/50 text-sm mt-1">Upload and manage images for your website.</p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-[#00C2FF]/30 bg-[#0d2255]/30 p-8 text-center mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="image-upload"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-10 h-10 text-[#00C2FF]/50 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Click to upload images</p>
          <p className="text-[#EAF7FF]/40 text-sm">PNG, JPG, GIF, WEBP (max 5MB)</p>
        </label>
        {uploading && <p className="text-[#00C2FF] text-sm mt-3">Uploading...</p>}
      </div>

      {allImages.length > 0 && (
        <div className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-6">
          <h3 className="text-white font-semibold mb-4">Uploaded Images ({allImages.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((url, i) => (
              <div key={i} className="group relative rounded-lg border border-[#00C2FF]/15 bg-[#0A1A3F]/60 overflow-hidden">
                <div className="aspect-square flex items-center justify-center p-2">
                  <img src={url} alt="" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="p-2 border-t border-[#00C2FF]/10">
                  <button
                    onClick={() => copyUrl(url)}
                    className="flex items-center gap-1 text-[#00C2FF] text-xs hover:text-[#00FFE0] transition-colors w-full"
                    data-testid={`button-copy-url-${i}`}
                  >
                    {copiedUrl === url ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedUrl === url ? "Copied!" : "Copy URL"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
