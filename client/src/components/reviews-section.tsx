import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Review } from "@shared/schema";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-[#EAF7FF]/20"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const displayReviews = reviews.length > 0 ? reviews : [
    { id: 1, customerName: "Rahul Sharma", rating: 5, comment: "Amazing service! My phone screen was replaced in just 25 minutes at my doorstep. Highly recommended!", service: "Screen Replacement", city: "Andheri", createdAt: new Date().toISOString() },
    { id: 2, customerName: "Priya Patel", rating: 5, comment: "Very professional technician. Fixed my laptop within 30 minutes. Genuine parts and great warranty.", service: "Battery Replacement", city: "Bandra", createdAt: new Date().toISOString() },
    { id: 3, customerName: "Amit Kumar", rating: 4, comment: "Excellent service! The technician was very polite and skilled. Will definitely use again!", service: "Charging Issues", city: "Thane", createdAt: new Date().toISOString() },
    { id: 4, customerName: "Sneha Gupta", rating: 5, comment: "Saved my water damaged phone! Thought it was gone but the technician fixed it perfectly.", service: "Water Damage", city: "Powai", createdAt: new Date().toISOString() },
  ];

  return (
    <section id="reviews" className="relative py-12 sm:py-20 bg-[#071533]" data-testid="section-reviews">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#00C2FF]" />
              <span className="text-[#00C2FF] text-sm font-semibold tracking-widest uppercase">Real Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">What Our Customers Say</h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-[#EAF7FF]/70 text-sm font-medium">4.9/5 from 500+ reviews</span>
            </div>

            <div className="hidden lg:block relative rounded-xl overflow-hidden border border-[#00C2FF]/15">
              <img
                src="/images/review-customer.jpg"
                alt="Happy customer"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071533] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">"Best repair service in town!"</p>
                <p className="text-[#00C2FF]/70 text-xs mt-1">Trusted by thousands of customers</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {displayReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative rounded-xl border border-[#00C2FF]/15 bg-gradient-to-br from-[#0d2255]/60 to-[#0A1A3F]/80 p-5"
                data-testid={`card-review-${index}`}
              >
                <Quote className="w-8 h-8 text-[#00C2FF]/20 mb-3" />
                <p className="text-[#EAF7FF]/70 text-sm leading-relaxed mb-4">{review.comment}</p>
                <div className="mt-auto">
                  <StarRating rating={review.rating} />
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#00FFE0] flex items-center justify-center text-[#0A1A3F] font-bold text-sm">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{review.customerName}</p>
                      <p className="text-[#00C2FF]/60 text-xs">{review.city} • {review.service}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
