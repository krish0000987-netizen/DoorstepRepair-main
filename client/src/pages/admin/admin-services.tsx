import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Wrench, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import ContentEditor from "./content-editor";

export default function AdminServices() {
  const { toast } = useToast();
  const { data: services = [], isLoading } = useQuery({ queryKey: ["/api/admin/services"] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "", icon: "", category: "repair", priceRange: "" });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof form }) => {
      await apiRequest("PUT", `/api/admin/services/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setEditingId(null);
      toast({ title: "Updated", description: "Service updated successfully." });
    },
  });

  const startEdit = (service: any) => {
    setEditingId(service.id);
    setForm({ name: service.name, description: service.description, icon: service.icon, category: service.category, priceRange: service.priceRange });
  };

  if (isLoading) return <div className="text-[#00C2FF] py-10 text-center">Loading services...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Services ({(services as any[]).length})</h2>
        <p className="text-[#EAF7FF]/50 text-sm">Edit service names and descriptions.</p>
      </div>

      <div className="space-y-3">
        {(services as any[]).map((service: any) => (
          <div key={service.id} className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4" data-testid={`service-${service.id}`}>
            {editingId === service.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Service Name</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-service-name" />
                  </div>
                  <div>
                    <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Icon (Lucide name)</label>
                    <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-service-icon" />
                  </div>
                </div>
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Description</label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white resize-none" data-testid="input-service-description" />
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => updateMutation.mutate({ id: service.id, data: form })} className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold" data-testid="button-save-service">
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" className="border-[#00C2FF]/30 text-[#00C2FF] bg-transparent">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00C2FF]/10 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-[#00C2FF]" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{service.name}</div>
                    <div className="text-[#EAF7FF]/50 text-xs">{service.description}</div>
                  </div>
                </div>
                <Button size="sm" onClick={() => startEdit(service)} className="bg-[#00C2FF]/10 text-[#00C2FF] hover:bg-[#00C2FF]/20 text-xs shrink-0" data-testid={`button-edit-service-${service.id}`}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-[#00C2FF]/15 pt-8">
        <ContentEditor
          section="specialities"
          title="Specialities Section"
          description="Edit the device specialities shown on the homepage."
          fields={[
            { key: "item_1_title", label: "Speciality 1 Title", type: "text" },
            { key: "item_1_description", label: "Speciality 1 Description", type: "text" },
            { key: "item_2_title", label: "Speciality 2 Title", type: "text" },
            { key: "item_2_description", label: "Speciality 2 Description", type: "text" },
            { key: "item_3_title", label: "Speciality 3 Title", type: "text" },
            { key: "item_3_description", label: "Speciality 3 Description", type: "text" },
          ]}
        />
      </div>

      <div className="border-t border-[#00C2FF]/15 pt-8">
        <ContentEditor
          section="why_choose"
          title="Why Choose Us Section"
          description="Edit the reasons displayed in the Why Choose Us section."
          fields={[
            { key: "reason_1_title", label: "Reason 1 Title", type: "text" },
            { key: "reason_1_description", label: "Reason 1 Description", type: "textarea" },
            { key: "reason_2_title", label: "Reason 2 Title", type: "text" },
            { key: "reason_2_description", label: "Reason 2 Description", type: "textarea" },
            { key: "reason_3_title", label: "Reason 3 Title", type: "text" },
            { key: "reason_3_description", label: "Reason 3 Description", type: "textarea" },
            { key: "reason_4_title", label: "Reason 4 Title", type: "text" },
            { key: "reason_4_description", label: "Reason 4 Description", type: "textarea" },
          ]}
        />
      </div>
    </div>
  );
}
