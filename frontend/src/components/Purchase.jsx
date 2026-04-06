import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";

const courseImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
];

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchases = async () => {
            const role = localStorage.getItem("role");
            if (role === "admin") {
                navigate("/");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${API_BASE_URL}/user/my-course`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPurchases(res.data.purchases || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, [navigate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-purple-400 text-xl animate-pulse font-medium">Loading your courses...</p>
            </div>
        );
    }

    return (
        <div className="p-10 min-h-screen pt-24 max-w-7xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-center mb-12 premium-heading pb-2 block"
            >
                My Enrolled Courses
            </motion.h1>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
            >
                {purchases.map((p, index) => {
                    const course = p.courseId;
                    if (!course) return null;

                    const imageToDisplay = course.imageLink || courseImages[index % courseImages.length];

                    return (
                        <motion.div
                            variants={itemVariants}
                            key={p._id}
                            className="course-card flex flex-col h-full group"
                        >
                            {/* Image Section */}
                            <div className="course-image-container relative">
                                <img
                                    src={imageToDisplay}
                                    alt={course.title}
                                    className="course-image"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60"></div>
                            </div>

                            {/* Content Section */}
                            <div className="course-content flex flex-col flex-grow p-6">
                                <h3 className="course-title text-xl font-bold line-clamp-1 mb-2">
                                    {course.title}
                                </h3>

                                <p className="course-description line-clamp-2 text-sm text-gray-400 mb-6 flex-grow">
                                    {course.description}
                                </p>

                                <div className="flex justify-center mt-auto pt-4 border-t border-white/10">
                                    <button
                                        className="btn-premium w-full text-center py-3"
                                        onClick={() => navigate(`/course/${course._id}/watch`)}
                                    >
                                        ▶ Start Learning
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            
            {purchases.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center mt-20 glass-panel p-12 rounded-3xl max-w-2xl mx-auto"
                >
                    <p className="text-gray-300 text-xl mb-8">You haven't purchased any courses yet.</p>
                    <button className="btn-premium px-8 py-3 text-lg shadow-[0_0_20px_rgba(96,27,153,0.3)]" onClick={() => window.location.href='/course'}>
                        Explore Courses
                    </button>
                </motion.div>
            )}
        </div>
    );
};


export default Purchase;
