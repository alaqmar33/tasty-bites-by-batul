"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { cn } from "@/lib/utils";
import { sectionPadding, container } from "@/lib/design-tokens";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import Button from "@/components/ui/Button";
import { getSupabase, Review } from "@/lib/supabase";

export default function WriteReviewPage() {
  // Form State
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Field Validation Errors
  const [errors, setErrors] = useState<{
    name?: string;
    rating?: string;
    reviewText?: string;
  }>({});

  // Reviews List State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Timestamp tracking for spam cooldown
  const [loadedAt] = useState<number>(() => Date.now());

  // Fetch reviews from Supabase
  const fetchReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    setFetchError(null);

    const supabase = getSupabase();
    if (!supabase) {
      setIsLoadingReviews(false);
      setFetchError("Database configuration is pending. Please ensure environment variables are set.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, customer_name, rating, review_text, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setReviews((data as Review[]) || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load reviews.";
      console.error("Error fetching reviews:", err);
      setFetchError(message);
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Validation function
  const validateForm = () => {
    const newErrors: { name?: string; rating?: string; reviewText?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Please enter your name.";
    } else if (trimmedName.length > 80) {
      newErrors.name = "Name must be 80 characters or fewer.";
    }

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Please select a star rating from 1 to 5.";
    }

    const trimmedReview = reviewText.trim();
    if (!trimmedReview) {
      newErrors.reviewText = "Please write a brief review.";
    } else if (trimmedReview.length < 5) {
      newErrors.reviewText = "Your review must be at least 5 characters.";
    } else if (reviewText.length > 1000) {
      newErrors.reviewText = "Your review cannot exceed 1000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam prevention check: honeypot
    if (honeypot.trim() !== "") {
      // Silently treat as success for automated spam bots
      setName("");
      setRating(0);
      setReviewText("");
      setSubmitSuccess(true);
      return;
    }

    // Rate limiting / quick submission check (minimum 1.5s after page load)
    if (Date.now() - loadedAt < 1500) {
      setSubmitError("Please take a moment before submitting.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setSubmitError("Database connection is not configured yet. Please check back shortly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: name.trim(),
        rating: Number(rating),
        review_text: reviewText.trim(),
      };

      const { data, error } = await supabase
        .from("reviews")
        .insert([payload])
        .select("id, customer_name, rating, review_text, created_at");

      if (error) {
        throw error;
      }

      // Success! Clear the form
      setName("");
      setRating(0);
      setHoverRating(0);
      setReviewText("");
      setErrors({});
      setSubmitSuccess(true);

      // Prepend the new review immediately if returned, or re-fetch from database
      if (data && data.length > 0) {
        setReviews((prev) => [data[0] as Review, ...prev.filter((r) => r.id !== data[0].id)]);
      } else {
        fetchReviews();
      }
    } catch (err: unknown) {
      console.error("Error submitting review:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while submitting your review. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeStarDisplay = hoverRating || rating;

  const starLabels = ["Poor", "Fair", "Good", "Very Good", "Exceptional"];

  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-cream pt-20">
      {/* ──────────────────────────────────────────────
          HERO & INTRODUCTION
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "pt-28 lg:pt-40 pb-10 lg:pb-14")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              Share Your Experience
            </span>
            <SectionHeading
              title="Write a Review"
              subtitle="Have you tried something from Tasty Bites by Batul? We'd love to hear about your experience!"
              align="center"
              ornament={true}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          REVIEW SUBMISSION FORM
          ────────────────────────────────────────────── */}
      <section className="pb-16 lg:pb-24">
        <div className={cn(container.narrow, "max-w-2xl mx-auto")}>
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
              {submitSuccess && (
                <div 
                  role="status"
                  className="mb-8 rounded-2xl bg-[#F4F9F4] border border-[#CDE3CD] p-5 text-[#245E24] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✨</span>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#1E4D1E] mb-1">
                        Thank you for your review!
                      </h4>
                      <p className="text-sm text-[#2A662A] leading-relaxed">
                        Your review has been shared and is now visible in the community reviews below. We truly appreciate your feedback!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div 
                  role="alert"
                  className="mb-8 rounded-2xl bg-[#FFF5F5] border border-[#FAD2D2] p-5 text-[#8A2B2B] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#7A1F1F] mb-1">
                        Could not submit review
                      </h4>
                      <p className="text-sm text-[#8A2B2B] leading-relaxed">
                        {submitError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label 
                      htmlFor="customer_name" 
                      className="block text-sm font-bold uppercase tracking-wider text-navy"
                    >
                      Your Name <span className="text-rose">*</span>
                    </label>
                    <span className="text-xs text-taupe">
                      {name.length}/80
                    </span>
                  </div>
                  <input
                    id="customer_name"
                    type="text"
                    maxLength={80}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Ananya Sharma"
                    className={cn(
                      "w-full rounded-xl border bg-white px-5 py-3.5 text-navy text-base placeholder:text-taupe/40 focus:outline-none transition-all duration-200",
                      errors.name
                        ? "border-rose focus:ring-2 focus:ring-rose/30"
                        : "border-border focus:ring-2 focus:ring-navy/30 focus:border-navy/40"
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-rose font-medium" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Interactive Star Rating */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-navy mb-2">
                    Your Rating <span className="text-rose">*</span>
                  </label>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div 
                      className="flex items-center gap-1.5"
                      role="radiogroup" 
                      aria-label="Star rating from 1 to 5"
                    >
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const isFilled = starValue <= activeStarDisplay;
                        return (
                          <button
                            key={starValue}
                            type="button"
                            role="radio"
                            aria-checked={rating === starValue}
                            aria-label={`${starValue} of 5 stars`}
                            disabled={isSubmitting}
                            onClick={() => {
                              setRating(starValue);
                              if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
                            }}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            onFocus={() => setHoverRating(starValue)}
                            onBlur={() => setHoverRating(0)}
                            className="p-1 rounded-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-navy/20 cursor-pointer disabled:cursor-not-allowed"
                          >
                            <svg
                              className={cn(
                                "w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-200",
                                isFilled
                                  ? "text-[#C9A96E] fill-[#C9A96E]"
                                  : "text-border fill-transparent stroke-border stroke-[1.5]"
                              )}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="currentColor"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>

                    {activeStarDisplay > 0 && (
                      <span className="text-sm font-serif italic text-navy font-medium">
                        {starLabels[activeStarDisplay - 1]} ({activeStarDisplay} / 5)
                      </span>
                    )}
                  </div>

                  {errors.rating && (
                    <p className="mt-2 text-xs text-rose font-medium" role="alert">
                      {errors.rating}
                    </p>
                  )}
                </div>

                {/* Review Text Field */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label 
                      htmlFor="review_text" 
                      className="block text-sm font-bold uppercase tracking-wider text-navy"
                    >
                      Your Review <span className="text-rose">*</span>
                    </label>
                    <span className={cn(
                      "text-xs transition-colors",
                      reviewText.length > 950 ? "text-rose font-medium" : "text-taupe"
                    )}>
                      {reviewText.length} / 1000 characters
                    </span>
                  </div>
                  <textarea
                    id="review_text"
                    rows={5}
                    maxLength={1000}
                    value={reviewText}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                      if (errors.reviewText) setErrors((prev) => ({ ...prev, reviewText: undefined }));
                    }}
                    placeholder="Tell us what you loved about our cookies, Berliners, cakes, or presentation..."
                    className={cn(
                      "w-full rounded-xl border bg-white px-5 py-4 text-navy text-base placeholder:text-taupe/40 focus:outline-none transition-all duration-200 resize-y min-h-[120px]",
                      errors.reviewText
                        ? "border-rose focus:ring-2 focus:ring-rose/30"
                        : "border-border focus:ring-2 focus:ring-navy/30 focus:border-navy/40"
                    )}
                    disabled={isSubmitting}
                  />
                  {errors.reviewText && (
                    <p className="mt-2 text-xs text-rose font-medium" role="alert">
                      {errors.reviewText}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[200px] justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg 
                          className="animate-spin h-5 w-5 text-cream" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          DECORATIVE DIVIDER
          ────────────────────────────────────────────── */}
      <div className="flex justify-center pb-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-16 bg-rose/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-px w-16 bg-rose/40" />
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          SUBMITTED REVIEWS LIST
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "bg-white border-t border-border/40")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-3 block">
              Community Voices
            </span>
            <SectionHeading
              title="Customer Reviews"
              subtitle="Real thoughts and experiences shared by our wonderful patrons."
              align="center"
              ornament={false}
            />
          </ScrollReveal>

          {/* Loading State */}
          {isLoadingReviews && (
            <div className="flex flex-col items-center justify-center py-16 text-taupe space-y-3">
              <svg 
                className="animate-spin h-7 w-7 text-navy/60" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm font-medium">Loading reviews...</p>
            </div>
          )}

          {/* Error Loading State */}
          {!isLoadingReviews && fetchError && (
            <div className="rounded-2xl bg-cream p-8 text-center border border-border/60 max-w-lg mx-auto">
              <p className="text-warm-brown text-sm mb-4 leading-relaxed">
                {fetchError}
              </p>
              <Button variant="outline" size="sm" onClick={() => fetchReviews()}>
                Retry
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingReviews && !fetchError && reviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-3xl border border-dashed border-border bg-cream/40 max-w-xl mx-auto">
              <span className="text-3xl mb-4">🍪</span>
              <h3 className="font-serif text-xl sm:text-2xl text-navy mb-2">
                Be the first to leave a review!
              </h3>
              <p className="text-warm-brown text-sm sm:text-base leading-relaxed max-w-md">
                No reviews have been submitted through our new review system yet. Share your experience using the form above!
              </p>
            </div>
          )}

          {/* Reviews List */}
          {!isLoadingReviews && !fetchError && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {reviews.map((rev) => {
                const formattedDate = rev.created_at
                  ? new Date(rev.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null;

                return (
                  <div
                    key={rev.id}
                    className="flex flex-col bg-cream/30 rounded-2xl p-6 sm:p-7 border border-border/60 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Review Header: Name + Rating + Date */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-navy">
                          {rev.customer_name}
                        </h4>
                        {formattedDate && (
                          <span className="text-xs text-taupe block mt-0.5">
                            {formattedDate}
                          </span>
                        )}
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 shrink-0" aria-label={`${rev.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((starIdx) => (
                          <svg
                            key={starIdx}
                            className={cn(
                              "w-4 h-4 sm:w-4.5 sm:h-4.5",
                              starIdx <= rev.rating
                                ? "text-[#C9A96E] fill-[#C9A96E]"
                                : "text-border/60 fill-transparent stroke-border stroke-[1.5]"
                            )}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-warm-brown text-[15px] sm:text-base leading-relaxed break-words whitespace-pre-line">
                      &ldquo;{rev.review_text}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
