import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";

const StarRating = ({ courseId, isPurchased, initialRating = 0 }) => {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(initialRating);
    const [submitted, setSubmitted] = useState(initialRating > 0);
    const [review, setReview] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleRate = async (star) => {
        if (!isPurchased) return;
        setSelected(star);
        setShowForm(true);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/rating`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ courseId, rating: selected, review }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Rating submitted! ⭐");
                setSubmitted(true);
                setShowForm(false);
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Failed to submit rating");
        }
    };

    if (!isPurchased) return null;

    return (
        <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2 font-medium">
                {submitted ? "Your Rating:" : "Rate this course:"}
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => !submitted && setHovered(star)}
                        onMouseLeave={() => !submitted && setHovered(0)}
                        className={`text-3xl transition-transform duration-100 ${!submitted ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
                        disabled={submitted}
                    >
                        <span className={
                            star <= (hovered || selected)
                                ? "text-yellow-400"
                                : "text-gray-600"
                        }>
                            ★
                        </span>
                    </button>
                ))}
                {selected > 0 && (
                    <span className="ml-2 text-yellow-400 font-bold self-center">
                        {selected}/5
                    </span>
                )}
            </div>

            {/* Review form */}
            {showForm && !submitted && (
                <div className="space-y-3">
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write a short review (optional)..."
                        rows={2}
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors text-sm cursor-pointer"
                        >
                            Submit Rating
                        </button>
                        <button
                            onClick={() => { setShowForm(false); setSelected(0); }}
                            className="px-5 py-2 rounded-xl border border-white/20 text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {submitted && (
                <p className="text-green-400 text-sm">
                    ✓ Thanks for rating!{" "}
                    <button
                        onClick={() => { setSubmitted(false); setShowForm(true); }}
                        className="text-purple-400 underline cursor-pointer ml-1"
                    >
                        Edit
                    </button>
                </p>
            )}
        </div>
    );
};

// Display-only average rating stars (for cards)
export const AverageStars = ({ average, total }) => {
    if (!average) return null;
    const filled = Math.round(average);

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${star <= filled ? "text-yellow-400" : "text-gray-600"}`}>★</span>
                ))}
            </div>
            <span className="text-yellow-400 text-sm font-semibold">{average}</span>
            <span className="text-gray-500 text-xs">({total})</span>
        </div>
    );
};

export default StarRating;
