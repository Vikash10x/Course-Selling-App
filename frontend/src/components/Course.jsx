import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Buy from "./Buy";
import UpdateCourse from "./UpdateCourse";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";

const courseImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
];

const Course = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/admin/course`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.courses) {
                    setCourses(data.courses);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

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

    return (
        <div className="p-10 min-h-screen pt-24">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-center mb-12 premium-heading pb-2"
            >
                Available Courses
            </motion.h1>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
            >
                {courses.map((course, index) => {
                    const fallbackImage = courseImages[index % courseImages.length];
                    const image = course.imageLink || fallbackImage;

                    return (
                        <motion.div
                            variants={itemVariants}
                            key={course._id}
                            onClick={() =>
                                navigate(`/course/${course._id}`, {
                                    state: {
                                        image,
                                        title: course.title,
                                        description: course.description,
                                        price: course.price,
                                    },
                                })
                            }
                            className="course-card flex flex-col h-full group"
                        >
                            <div className="price-badge">${course.price}</div>

                            {/* Image Section */}
                            <div className="course-image-container relative">
                                <img
                                    src={image}
                                    alt={course.title}
                                    className="course-image"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60"></div>
                            </div>

                            {/* Content Section */}
                            <div className="course-content flex flex-col flex-grow p-6">
                                <h2 className="course-title text-xl font-bold line-clamp-1 mb-2">
                                    {course.title}
                                </h2>

                                <p className="course-description line-clamp-2 text-sm text-gray-400 mb-6 flex-grow">
                                    {course.description}
                                </p>

                                {/* Actions */}
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                                    {localStorage.getItem("role") !== "admin" && (
                                        <div onClick={(e) => e.stopPropagation()} className="flex-1">
                                            <Buy id={course._id} setCourses={setCourses} />
                                        </div>
                                    )}

                                    {localStorage.getItem("role") === "admin" && (
                                        <div onClick={(e) => e.stopPropagation()} className="flex gap-4 w-full">
                                            <div className="flex-1">
                                                <UpdateCourse course={course} setCourses={setCourses} />
                                            </div>
                                            <div className="flex-1">
                                                <Delete id={course._id} setCourses={setCourses} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Course;
