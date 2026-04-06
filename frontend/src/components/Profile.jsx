import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const courseImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
];

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) { navigate("/signin"); return; }
                const res = await axios.get(`${API_BASE_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.success) setProfile(res.data);
            } catch {
                navigate("/signin");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <CircularProgress style={{ color: "#b388ff" }} />
        </div>
    );

    if (!profile) return null;

    const { user, purchases } = profile;
    const avatarLetter = (user.name || user.email)?.[0]?.toUpperCase();
    const joinDate = new Date(user._id ? parseInt(user._id.substring(0, 8), 16) * 1000 : Date.now());

    return (
        <div className="max-w-5xl mx-auto px-4 pt-28 pb-16 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Profile Header */}
                <div className="glass-panel rounded-3xl p-8 mb-10 flex flex-col sm:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-extrabold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #601b99 0%, #3f1066 100%)", boxShadow: "0 0 30px rgba(96,27,153,0.5)" }}
                    >
                        {avatarLetter}
                    </div>

                    {/* Info */}
                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-3xl font-extrabold premium-heading mb-1">{user.name}</h1>
                        <p className="text-gray-400 text-sm mb-3">{user.email}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                            <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                                {user.role === "admin" ? "👑 Admin" : "🎓 Student"}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                                📅 Joined {joinDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                                📚 {purchases.length} Course{purchases.length !== 1 ? "s" : ""} Enrolled
                            </span>
                        </div>
                    </div>
                </div>

                {/* Enrolled Courses - Only for students */}
                {user.role !== "admin" && (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span>My Courses</span>
                            <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">{purchases.length}</span>
                        </h2>

                        {purchases.length === 0 ? (
                            <div className="glass-panel rounded-3xl p-12 text-center">
                                <p className="text-gray-400 text-lg mb-6">You haven't enrolled in any courses yet.</p>
                                <button onClick={() => navigate("/course")} className="btn-premium px-8 py-3">
                                    Explore Courses
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {purchases.map((p, index) => {
                                    const course = p.courseId;
                                    if (!course) return null;
                                    const img = course.imageLink || courseImages[index % courseImages.length];

                                    return (
                                        <motion.div
                                            key={p._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                            className="course-card group cursor-pointer"
                                            onClick={() => navigate(`/course/${course._id}`)}
                                        >
                                            <div className="course-image-container relative">
                                                <img src={img} alt={course.title} className="course-image" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60" />
                                                <div className="absolute top-3 right-3 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                    ✓ Enrolled
                                                </div>
                                            </div>
                                            <div className="course-content p-5">
                                                <h3 className="course-title text-lg font-bold line-clamp-1 mb-1">{course.title}</h3>
                                                <p className="course-description text-sm text-gray-400 line-clamp-2 mb-3">{course.description}</p>
                                                <button
                                                    className="btn-premium w-full py-2 text-sm"
                                                    onClick={(e) => { e.stopPropagation(); navigate(`/course/${course._id}/watch`); }}
                                                >
                                                    ▶ Continue Learning
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Profile;
