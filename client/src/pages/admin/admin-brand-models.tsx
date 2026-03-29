import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Trash2, Smartphone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { allBrands } from "@/lib/brands-data";
import type { BrandModel } from "@shared/schema";

export default function AdminBrandModels() {
  const { toast } = useToast();
  const [selectedBrand, setSelectedBrand] = useState(allBrands[0]?.slug || "");
  const [newModel, setNewModel] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const { data: allModels = [], isLoading } = useQuery<BrandModel[]>({
    queryKey: ["/api/brand-models"],
  });

  const addMutation = useMutation({
    mutationFn: (data: { brandSlug: string; modelName: string }) =>
      apiRequest("POST", "/api/admin/brand-models", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brand-models"] });
      setNewModel("");
      toast({ title: "Model added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add model", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/admin/brand-models/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brand-models"] });
      toast({ title: "Model removed" });
    },
  });

  const handleAdd = () => {
    const trimmed = newModel.trim();
    if (!trimmed || !selectedBrand) return;
    addMutation.mutate({ brandSlug: selectedBrand, modelName: trimmed });
  };

  const brandModels = allModels.filter((m) => m.brandSlug === selectedBrand);
  const currentBrand = allBrands.find((b) => b.slug === selectedBrand);
  const defaultModels = currentBrand?.popularModels || [];

  const filteredBrands = allBrands.filter((b) =>
    b.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const modelCounts = allModels.reduce<Record<string, number>>((acc, m) => {
    acc[m.brandSlug] = (acc[m.brandSlug] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" data-testid="text-brand-models-title">Brand Models Management</h2>
        <p className="text-[#EAF7FF]/50 text-sm">Add or remove device models for each brand. These will appear on the brand pages.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-[#00C2FF]/20 bg-[#0d2255]/30 p-4">
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF7FF]/30" />
                <Input
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search brands..."
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30 pl-9 text-sm"
                  data-testid="input-search-brands"
                />
              </div>
            </div>
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredBrands.map((brand) => (
                <button
                  key={brand.slug}
                  onClick={() => setSelectedBrand(brand.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedBrand === brand.slug
                      ? "bg-[#00C2FF]/15 text-[#00C2FF] border border-[#00C2FF]/30"
                      : "text-[#EAF7FF]/60 hover:text-white hover:bg-white/5"
                  }`}
                  data-testid={`button-brand-${brand.slug}`}
                >
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 shrink-0" />
                    {brand.name}
                  </span>
                  {modelCounts[brand.slug] ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#00C2FF]/10 text-[#00C2FF]">
                      {modelCounts[brand.slug]}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[#00C2FF]/20 bg-[#0d2255]/30 p-5">
            <h3 className="text-white font-bold mb-1" data-testid="text-selected-brand">
              {currentBrand?.name || "Select a brand"}
            </h3>
            <p className="text-[#EAF7FF]/40 text-xs mb-4">
              Add new models that your team can repair for this brand.
            </p>

            <div className="flex gap-2">
              <Input
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="e.g. iPhone 15 Pro Max"
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                data-testid="input-new-model"
              />
              <Button
                onClick={handleAdd}
                disabled={!newModel.trim() || addMutation.isPending}
                className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold shrink-0"
                data-testid="button-add-model"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {brandModels.length > 0 && (
            <div className="rounded-xl border border-[#00C2FF]/20 bg-[#0d2255]/30 p-5">
              <h4 className="text-white font-semibold text-sm mb-3">
                Custom Models ({brandModels.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {brandModels.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00FFE0]/20 bg-[#00FFE0]/5 text-sm"
                    data-testid={`model-custom-${model.id}`}
                  >
                    <span className="text-[#00FFE0] font-medium">{model.modelName}</span>
                    <button
                      onClick={() => deleteMutation.mutate(model.id)}
                      className="text-red-400/60 hover:text-red-400 transition-colors"
                      data-testid={`button-delete-model-${model.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {defaultModels.length > 0 && (
            <div className="rounded-xl border border-[#00C2FF]/10 bg-[#0d2255]/20 p-5">
              <h4 className="text-[#EAF7FF]/50 font-semibold text-sm mb-3">
                Default Models (built-in)
              </h4>
              <div className="flex flex-wrap gap-2">
                {defaultModels.map((model, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-lg border border-[#00C2FF]/10 bg-[#0A1A3F]/50 text-[#EAF7FF]/40 text-sm"
                    data-testid={`model-default-${i}`}
                  >
                    {model}
                  </div>
                ))}
              </div>
              <p className="text-[#EAF7FF]/30 text-xs mt-3">
                These are built-in and always shown. Custom models you add above will appear alongside these.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8 text-[#00C2FF]">Loading models...</div>
          )}
        </div>
      </div>
    </div>
  );
}
