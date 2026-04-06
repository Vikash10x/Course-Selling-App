import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { AverageStars } from "./RatingStars";
import StarRating from "./RatingStars";

// Convert any YouTube URL format to embed URL
const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    // Already an embed URL
    if (url.includes("youtube.com/embed/")) return url;

    // youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Direct video URL (MP4, etc.) — return as-is
    return url;
};

const isYouTubeUrl = (url) =>
    url && (url.includes("youtube.com") || url.includes("youtu.be"));

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [isPurchased, setIsPurchased] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ratingData, setRatingData] = useState({ average: null, totalRatings: 0 });
    const [myRating, setMyRating] = useState(0);

    useEffect(() => {
        checkAccessAndLoad();
    }, [id]);

    const checkAccessAndLoad = async () => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/signin"); return; }

        try {
            // Fetch course details
            const courseRes = await axios.get(`${API_BASE_URL}/user/list/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const courseData = courseRes.data?.list?.[0];
            if (!courseData) { navigate("/course"); return; }
            setCourse(courseData);

            // Check if purchased
            const purchaseRes = await axios.get(`${API_BASE_URL}/user/my-course`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const purchases = purchaseRes.data?.purchases || [];
            const bought = purchases.some((p) => p.courseId?._id === id || p.courseId === id);

            // Also check via rating endpoint (user with my-rating means purchased)
            const ratingRes = await axios.get(`${API_BASE_URL}/rating/${id}/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!bought) {
                // Not purchased — redirect away
                navigate(`/course/${id}`);
                return;
            }

            setIsPurchased(true);
            if (ratingRes.data?.myRating) setMyRating(ratingRes.data.myRating.rating);

            // Fetch average rating
            const avgRes = await axios.get(`${API_BASE_URL}/rating/${id}`);
            if (avgRes.data.success) setRatingData(avgRes.data);

        } catch (err) {
            console.error(err);
            navigate("/course");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <CircularProgress style={{ color: "#b388ff" }} />
        </div>
    );

    if (!course) return null;

    const embedUrl = getYouTubeEmbedUrl(course.videoUrl);
    const isYT = isYouTubeUrl(course.videoUrl);

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                {/* Back button */}
                <button
                    onClick={() => navigate(`/course/${id}`)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                    ← Back to Course
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video Player */}
                    <div className="flex-1">
                        <div className="glass-panel rounded-2xl overflow-hidden">
                            {embedUrl ? (
                                isYT ? (
                                    // YouTube embed
                                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                        <iframe
                                            src={`${embedUrl}?autoplay=0&rel=0&modestbranding=1`}
                                            title={course.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full rounded-2xl"
                                            style={{ border: "none" }}
                                        />
                                    </div>
                                ) : (
                                    // Direct video file
                                    <video
                                        src={course.videoUrl}
                                        controls
                                        className="w-full rounded-2xl max-h-[500px]"
                                    />
                                )
                            ) : (
                                // No video added yet
                                <div className="flex flex-col items-center justify-center h-72 text-gray-500 gap-4">
                                    <span className="text-6xl">🎬</span>
                                    <p className="text-lg">No video available for this course yet.</p>
                                    <p className="text-sm text-gray-600">Admin needs to add a video URL.</p>
                                </div>
                            )}
                        </div>

                        {/* Course Info */}
                        <div className="mt-6 space-y-3">
                            <h1 className="text-3xl font-extrabold premium-heading">{course.title}</h1>
                            <AverageStars average={ratingData.average} total={ratingData.totalRatings} />
                            <p className="text-gray-300 leading-relaxed">{course.description}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        {/* Enrollment badge */}
                        <div className="glass-panel rounded-2xl p-5 text-center border border-green-500/20 bg-green-500/5">
                            <div className="text-4xl mb-2">✅</div>
                            <p className="text-green-400 font-bold text-lg">You're Enrolled!</p>
                            <p className="text-gray-400 text-sm mt-1">Full access to this course</p>
                        </div>

                        {/* Rating section */}
                        <div className="glass-panel rounded-2xl p-5">
                            <h3 className="text-white font-bold mb-3">Rate This Course</h3>
                            <StarRating
                                courseId={id}
                                isPurchased={isPurchased}
                                initialRating={myRating}
                            />
                        </div>

                        {/* Course stats */}
                        <div className="glass-panel rounded-2xl p-5 space-y-3">
                            <h3 className="text-white font-bold mb-2">Course Info</h3>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Price</span>
                                <span className="text-white font-semibold">₹{course.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Status</span>
                                <span className="text-green-400 font-semibold">Enrolled</span>
                            </div>
                            {ratingData.average && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Rating</span>
                                    <span className="text-yellow-400 font-semibold">⭐ {ratingData.average}/5</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CoursePlayer;
