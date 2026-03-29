import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar, Trash2, Check, Clock, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminBookings() {
  const { toast } = useToast();
  const { data: bookings = [], isLoading } = useQuery({ queryKey: ["/api/admin/bookings"] });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      toast({ title: "Updated", description: "Booking status updated." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      toast({ title: "Deleted", description: "Booking deleted." });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "confirmed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) {
    return <div className="text-[#00C2FF] py-10 text-center">Loading bookings...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Bookings ({(bookings as any[]).length})</h2>
        <p className="text-[#EAF7FF]/50 text-sm mt-1">Manage customer repair bookings.</p>
      </div>

      {(bookings as any[]).length === 0 ? (
        <div className="text-center py-16 text-[#EAF7FF]/40">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(bookings as any[]).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking: any) => (
            <div key={booking.id} className="rounded-xl border border-[#00C2FF]/15 bg-[#0d2255]/40 p-4 sm:p-5" data-testid={`booking-${booking.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-semibold">{booking.customerName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <div><span className="text-[#EAF7FF]/40">Phone:</span> <span className="text-[#EAF7FF]/70">{booking.phone}</span></div>
                    <div><span className="text-[#EAF7FF]/40">Device:</span> <span className="text-[#EAF7FF]/70">{booking.brand} {booking.deviceType}</span></div>
                    <div><span className="text-[#EAF7FF]/40">Problem:</span> <span className="text-[#EAF7FF]/70">{booking.problem}</span></div>
                    <div><span className="text-[#EAF7FF]/40">Area:</span> <span className="text-[#EAF7FF]/70">{booking.city}</span></div>
                    <div><span className="text-[#EAF7FF]/40">Date:</span> <span className="text-[#00C2FF]">{booking.scheduledDate}</span></div>
                    <div><span className="text-[#EAF7FF]/40">Time:</span> <span className="text-[#00C2FF]">{booking.scheduledTime}</span></div>
                  </div>
                  {booking.address && <div className="text-[#EAF7FF]/40 text-xs mt-2">Address: {booking.address}</div>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {booking.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => statusMutation.mutate({ id: booking.id, status: "confirmed" })}
                        className="bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 text-xs"
                        data-testid={`button-confirm-${booking.id}`}
                      >
                        <Check className="w-3 h-3 mr-1" /> Confirm
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => statusMutation.mutate({ id: booking.id, status: "cancelled" })}
                        className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 text-xs"
                        data-testid={`button-cancel-${booking.id}`}
                      >
                        <XIcon className="w-3 h-3 mr-1" /> Cancel
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() => statusMutation.mutate({ id: booking.id, status: "completed" })}
                      className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 text-xs"
                      data-testid={`button-complete-${booking.id}`}
                    >
                      <Check className="w-3 h-3 mr-1" /> Complete
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => deleteMutation.mutate(booking.id)}
                    className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs"
                    data-testid={`button-delete-booking-${booking.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
