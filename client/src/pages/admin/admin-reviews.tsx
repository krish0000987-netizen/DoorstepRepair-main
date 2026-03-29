import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Star, Trash2, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminReviews() {
  const { toast } = useToast();
  const { data: reviews = [], isLoading } = useQuery({ queryKey: ["/api/admin/reviews"] });
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ customerName: "", rating: 5, comment: "", service: "", city: "" });

  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      await apiRequest("POST", "/api/admin/reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      setShowAdd(false);
      setForm({ customerName: "", rating: 5, comment: "", service: "", city: "" });
      toast({ title: "Added", description: "Review added successfully." });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof form }) => {
      await apiRequest("PUT", `/api/admin/reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      setEditingId(null);
      toast({ title: "Updated", description: "Review updated successfully." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({ title: "Deleted", description: "Review deleted." });
    },
  });

  const startEdit = (review: any) => {
    setEditingId(review.id);
    setForm({ customerName: review.customerName, rating: review.rating, comment: review.comment, service: review.service, city: review.city });
  };

  if (isLoading) return <div className="text-[#00C2FF] py-10 text-center">Loading reviews...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Reviews ({(reviews as any[]).length})</h2>
          <p className="text-[#EAF7FF]/50 text-sm mt-1">Manage customer reviews and testimonials.</p>
        </div>
        <Button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); setForm({ customerName: "", rating: 5, comment: "", service: "", city: "" }); }}
          className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold"
          data-testid="button-add-review"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Review
        </Button>
      </div>

      {(showAdd || editingId) && (
        <div className="rounded-xl border border-[#00C2FF]/20 bg-[#0d2255]/50 p-5 mb-6 space-y-4">
          <h3 className="text-white font-semibold">{editingId ? "Edit Review" : "Add New Review"}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Customer Name</label>
              <Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-review-name" />
            </div>
            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Rating (1-5)</label>
              <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-review-rating" />
            </div>
            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Service</label>
              <Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-review-service" />
            </div>
            <div>
              <label className="text-[#EAF7FF]/70 text-sm mb-1 block">City</label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="input-review-city" />
            </div>
          </div>
          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-1 block">Comment</label>
            <Textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white resize-none" data-testid="input-review-comment" />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: form }) : addMutation.mutate(form)}
              disabled={!form.customerName || !form.comment || !form.service || !form.city}
              className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40"
              data-testid="button-save-review"
            >
              <Save className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Add"} Review
            </Button>
            <Button onClick={() => { setShowAdd(false); setEditingId(null); }} variant="outline" className="border-[#00C2FF]/30 text-[#00C2FF] bg-transparent">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {(reviews as any[]).map((review: any) => (
          <div key={review.id} className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4" data-testid={`review-${review.id}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-semibold text-sm">{review.customerName}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-[#EAF7FF]/20"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[#EAF7FF]/60 text-sm mb-1">{review.comment}</p>
                <div className="text-[#EAF7FF]/40 text-xs">{review.service} • {review.city}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" onClick={() => startEdit(review)} className="bg-[#00C2FF]/10 text-[#00C2FF] hover:bg-[#00C2FF]/20 text-xs" data-testid={`button-edit-review-${review.id}`}>
                  Edit
                </Button>
                <Button size="sm" onClick={() => deleteMutation.mutate(review.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs" data-testid={`button-delete-review-${review.id}`}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
