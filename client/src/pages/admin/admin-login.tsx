import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import logoPath from "@assets/WhatsApp_Image_2026-03-02_at_2.24.37_PM_1772459749185.jpeg";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/login", { username, password });
      setLocation("/admin");
    } catch (err: any) {
      toast({ title: "Login Failed", description: "Invalid username or password", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A3F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoPath} alt="Devices Doctor" className="h-16 w-auto object-contain mix-blend-lighten mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-[#EAF7FF]/60">Devices Doctor Content Management</p>
        </div>
        <form onSubmit={handleLogin} className="rounded-2xl border border-[#00C2FF]/20 bg-[#0d2255]/50 p-8 space-y-6">
          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C2FF]/50" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30 pl-10"
                data-testid="input-admin-username"
              />
            </div>
          </div>
          <div>
            <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00C2FF]/50" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30 pl-10"
                data-testid="input-admin-password"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40"
            data-testid="button-admin-login"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
