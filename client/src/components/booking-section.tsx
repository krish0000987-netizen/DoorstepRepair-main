import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Smartphone, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

const deviceTypes = ["Mobile Phone", "Laptop", "Tablet / iPad", "Smart Watch"];
const brands: Record<string, string[]> = {
  "Mobile Phone": ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Nothing", "Google Pixel", "Other"],
  "Laptop": ["Apple MacBook", "HP", "Dell", "Lenovo", "Asus", "Acer", "MSI", "Other"],
  "Tablet / iPad": ["Apple iPad", "Samsung Tab", "Lenovo Tab", "Other"],
  "Smart Watch": ["Apple Watch", "Samsung Galaxy Watch", "Noise", "boAt", "Other"],
};
const problems: Record<string, string[]> = {
  "Mobile Phone": ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera Repair", "Speaker / Mic Issue", "Water Damage", "Software Issue", "Motherboard Repairing", "Back Glass / Back Panel", "Diagnosis", "Other"],
  "Laptop": ["Screen Replacement", "Battery Replacement", "Keyboard Replacement", "Hinge Repair", "Motherboard Repair", "Software / OS Issue", "Diagnosis", "Other"],
  "Tablet / iPad": ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Software Issue", "Back Panel", "Diagnosis", "Other"],
  "Smart Watch": ["Screen Replacement", "Battery Replacement", "Band Replacement", "Software Issue", "Diagnosis", "Other"],
};
const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM", "5:00 PM - 7:00 PM"];

export default function BookingSection() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    deviceType: "",
    brand: "",
    model: "",
    problem: "",
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    scheduledDate: "",
    scheduledTime: "",
    estimatedPrice: 0,
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: (_result, variables) => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });

      const message = `*New Repair Booking - Devices Doctor*\n\n` +
        `*Device:* ${variables.deviceType}\n` +
        `*Brand:* ${variables.brand}\n` +
        (variables.model ? `*Model:* ${variables.model}\n` : "") +
        `*Problem:* ${variables.problem}\n\n` +
        `*Customer:* ${variables.customerName}\n` +
        `*Phone:* ${variables.phone}\n` +
        (variables.email ? `*Email:* ${variables.email}\n` : "") +
        `*Address:* ${variables.address}\n` +
        `*City:* ${variables.city}\n\n` +
        `*Scheduled:* ${variables.scheduledDate} | ${variables.scheduledTime}`;

      setTimeout(() => {
        window.location.href = `https://wa.me/918169701980?text=${encodeURIComponent(message)}`;
      }, 500);
    },
    onError: () => {
      toast({ title: "Booking failed", description: "Please try again or call us directly.", variant: "destructive" });
    },
  });

  const updateField = (field: string, value: string) => {
    const updated = { ...form, [field]: value };
    if (field === "deviceType") {
      updated.brand = "";
      updated.problem = "";
      updated.estimatedPrice = 0;
    }
    setForm(updated);
  };

  const canProceedStep1 = form.deviceType && form.brand && form.problem;
  const canProceedStep2 = form.customerName && form.phone && form.address && form.city;
  const canSubmit = form.scheduledDate && form.scheduledTime;

  const handleSubmit = () => {
    if (!canSubmit) return;
    bookingMutation.mutate(form);
  };

  if (submitted) {
    return (
      <section id="booking" className="relative py-20 bg-[#071533]" data-testid="section-booking-success">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#00FFE0] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#0A1A3F]" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
          <p className="text-[#EAF7FF]/70 mb-2">Thank you, {form.customerName}!</p>
          <p className="text-[#EAF7FF]/60 text-sm mb-6">Our technician will arrive at your doorstep on {form.scheduledDate} during {form.scheduledTime}.</p>
          <p className="text-[#EAF7FF]/50 text-xs mb-4">Redirecting you to WhatsApp to confirm your booking...</p>
          <div className="mt-8">
            <Button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ deviceType: "", brand: "", model: "", problem: "", customerName: "", phone: "", email: "", address: "", city: "", scheduledDate: "", scheduledTime: "", estimatedPrice: 0 }); }}
              className="bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-semibold no-default-hover-elevate no-default-active-elevate"
              data-testid="button-book-another"
            >
              Book Another Repair
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-12 sm:py-20 bg-[#071533]" data-testid="section-booking">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
      <div className="absolute inset-0 bg-neon-glow opacity-10" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00C2FF]" />
            <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Book Now</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Book Your Repair</h2>
          <p className="text-[#EAF7FF]/60">Quick & easy booking in 3 simple steps</p>
        </motion.div>

        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-1 sm:gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${step >= s ? "bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F]" : "border border-[#00C2FF]/30 text-[#00C2FF]/50"}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-8 sm:w-20 h-0.5 transition-all duration-300 ${step > s ? "bg-gradient-to-r from-[#00C2FF] to-[#00FFE0]" : "bg-[#00C2FF]/20"}`} />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-[#00C2FF]/20 bg-gradient-to-br from-[#0d2255]/70 to-[#0A1A3F]/90 p-6 sm:p-8"
        >
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
                <Smartphone className="w-5 h-5 text-[#00C2FF]" /> Select Your Device
              </h3>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Device Type *</label>
                <Select value={form.deviceType} onValueChange={(v) => updateField("deviceType", v)}>
                  <SelectTrigger className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="select-device-type">
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d2255] border-[#00C2FF]/30">
                    {deviceTypes.map((d) => (
                      <SelectItem key={d} value={d} className="text-white hover:bg-[#00C2FF]/10">{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {form.deviceType && (
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Brand *</label>
                  <Select value={form.brand} onValueChange={(v) => updateField("brand", v)}>
                    <SelectTrigger className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="select-brand">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d2255] border-[#00C2FF]/30">
                      {(brands[form.deviceType] || []).map((b) => (
                        <SelectItem key={b} value={b} className="text-white hover:bg-[#00C2FF]/10">{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {form.brand && (
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Model (Optional)</label>
                  <Input
                    value={form.model}
                    onChange={(e) => updateField("model", e.target.value)}
                    placeholder="e.g. iPhone 15, Galaxy S24"
                    className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                    data-testid="input-model"
                  />
                </div>
              )}
              {form.deviceType && (
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Problem *</label>
                  <Select value={form.problem} onValueChange={(v) => updateField("problem", v)}>
                    <SelectTrigger className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white" data-testid="select-problem">
                      <SelectValue placeholder="Select problem" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0d2255] border-[#00C2FF]/30">
                      {(problems[form.deviceType] || []).map((p) => (
                        <SelectItem key={p} value={p} className="text-white hover:bg-[#00C2FF]/10">
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40 no-default-hover-elevate no-default-active-elevate"
                data-testid="button-next-step-1"
              >
                Next: Your Details
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#00C2FF]" /> Your Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Full Name *</label>
                  <Input
                    value={form.customerName}
                    onChange={(e) => updateField("customerName", e.target.value)}
                    placeholder="Your name"
                    className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Phone Number *</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Your phone number"
                    className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Email (Optional)</label>
                <Input
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="your@email.com"
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Full Address *</label>
                <Input
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="House No., Street, Area"
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                  data-testid="input-address"
                />
              </div>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">City / Location *</label>
                <Input
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Andheri West, Mumbai"
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white placeholder:text-[#EAF7FF]/30"
                  data-testid="input-city"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="border-[#00C2FF]/30 text-[#00C2FF] bg-transparent no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-back-step-2"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-next-step-2"
                >
                  Next: Schedule
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-[#00C2FF]" /> Schedule Repair
              </h3>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Preferred Date *</label>
                <Input
                  type="date"
                  value={form.scheduledDate}
                  onChange={(e) => updateField("scheduledDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-[#0A1A3F]/80 border-[#00C2FF]/20 text-white [color-scheme:dark]"
                  data-testid="input-date"
                />
              </div>
              <div>
                <label className="text-[#EAF7FF]/70 text-sm mb-2 block">Time Slot *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => updateField("scheduledTime", slot)}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 text-left ${form.scheduledTime === slot ? "border-[#00C2FF] bg-[#00C2FF]/15 text-[#00C2FF]" : "border-[#00C2FF]/15 text-[#EAF7FF]/60 hover:border-[#00C2FF]/40"}`}
                      data-testid={`button-timeslot-${slot.replace(/\s/g, "")}`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />{slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#00C2FF]/20 bg-[#0A1A3F]/60 p-3 sm:p-4 space-y-2">
                <h4 className="text-white font-semibold text-sm mb-3">Booking Summary</h4>
                <div className="flex justify-between gap-2 text-xs sm:text-sm"><span className="text-[#EAF7FF]/50 shrink-0">Device:</span><span className="text-white text-right truncate">{form.brand} {form.deviceType}</span></div>
                <div className="flex justify-between gap-2 text-xs sm:text-sm"><span className="text-[#EAF7FF]/50 shrink-0">Problem:</span><span className="text-white text-right truncate">{form.problem}</span></div>
                <div className="flex justify-between gap-2 text-xs sm:text-sm"><span className="text-[#EAF7FF]/50 shrink-0">Location:</span><span className="text-white text-right truncate">{form.city}</span></div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="border-[#00C2FF]/30 text-[#00C2FF] bg-transparent no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-back-step-3"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || bookingMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-[#00C2FF] to-[#00FFE0] text-[#0A1A3F] font-bold disabled:opacity-40 no-default-hover-elevate no-default-active-elevate"
                  data-testid="button-confirm-booking"
                >
                  {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
