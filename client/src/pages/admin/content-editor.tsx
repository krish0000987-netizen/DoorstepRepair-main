import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Save, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface ContentField {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
}

interface ContentEditorProps {
  section: string;
  title: string;
  description: string;
  fields: ContentField[];
}

export default function ContentEditor({ section, title, description, fields }: ContentEditorProps) {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const { data: content = [], isLoading } = useQuery({
    queryKey: ["/api/content", section],
  });

  useEffect(() => {
    if (Array.isArray(content) && content.length > 0) {
      const map: Record<string, string> = {};
      (content as any[]).forEach((item: any) => {
        map[item.key] = item.value;
      });
      setValues(map);
    }
  }, [content]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const items = fields.map((f) => ({
        section,
        key: f.key,
        value: values[f.key] || "",
        contentType: f.type === "image" ? "image" : "text",
      }));
      await apiRequest("PUT", "/api/admin/content/bulk", { items });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      queryClient.invalidateQueries({ queryKey: ["/api/content", section] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast({ title: "Saved!", description: `${title} content updated successfully.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save content.", variant: "destructive" });
    },
  });

  const handleImageUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (data.url) {
        setValues((prev) => ({ ...prev, [key]: data.url }));
        toast({ title: "Uploaded!", description: "Image uploaded successfully." });
      }
    } catch {
      toast({ title: "Error", description: "Failed to upload image.", variant: "destructive" });
    } finally {
      setUploadingKey(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#00C2FF]">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-[#EAF7FF]/50 text-sm mt-1">{description}</p>
      </div>

      <div className="space-y-5 rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-6">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-[#EAF7FF]/70 text-sm mb-2 block font-medium">{field.label}</label>
            {field.type === "textarea" ? (
              <Textarea
                value={values[field.key] || ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                rows={3}
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30 resize-none"
                data-testid={`textarea-${field.key}`}
              />
            ) : field.type === "image" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    value={values[field.key] || ""}
                    onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder="Image URL or upload"
                    className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30 flex-1"
                    data-testid={`input-${field.key}`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleImageUpload(field.key, e.target.files[0]);
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setUploadingKey(field.key);
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImageUpload(field.key, file);
                      };
                      input.click();
                    }}
                    disabled={uploadingKey === field.key}
                    className="bg-[#00C2FF]/20 border border-[#00C2FF]/30 text-[#00C2FF] hover:bg-[#00C2FF]/30 shrink-0"
                    data-testid={`button-upload-${field.key}`}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {uploadingKey === field.key ? "..." : "Upload"}
                  </Button>
                </div>
                {values[field.key] && (
                  <div className="w-32 h-32 rounded-lg border border-[#00C2FF]/20 overflow-hidden bg-[#0A1A3F]/60">
                    <img src={values[field.key]} alt="" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            ) : (
              <Input
                value={values[field.key] || ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                data-testid={`input-${field.key}`}
              />
            )}
          </div>
        ))}

        <Button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold w-full sm:w-auto"
          data-testid="button-save-content"
        >
          {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : <><Save className="w-4 h-4 mr-2" /> {saveMutation.isPending ? "Saving..." : "Save Changes"}</>}
        </Button>
      </div>
    </div>
  );
}
