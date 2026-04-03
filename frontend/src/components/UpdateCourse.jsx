import React, { useState } from "react";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

const UpdateCourse = ({ course, setCourses }) => {
    const [open, setOpen] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState({
        title: course.title,
        description: course.description,
        price: course.price,
        imageLink: course.imageLink || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/admin/update/${course._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedCourse),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // alert("Course updated successfully!");
                setCourses((prev) =>
                    prev.map((c) => c._id === course._id ? { ...c, ...updatedCourse } : c)
                );
                setOpen(false);
            } else {
                alert(data.message || "Failed to update course");
            }
        } catch (err) {
            console.log("Error:", err);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <button
                className="btn-premium w-full"
                style={{
                    backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
                    boxShadow: "0 4px 15px rgba(30, 58, 138, 0.4)"
                }}
                onClick={() => setOpen(true)}
            >
                Edit
            </button>

            {open && createPortal(
                <div
                    className="fixed inset-0 flex justify-center items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-[#efefef] rounded-xl p-6 w-96 text-left shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-black text-center">
                            Update Course
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={updatedCourse.title}
                                onChange={(e) =>
                                    setUpdatedCourse({ ...updatedCourse, title: e.target.value })
                                }
                                placeholder="Course Name"
                                className="border border-gray-300 p-2 rounded-xl w-full mb-3 text-black bg-white shadow-sm"
                                required
                            />

                            <input
                                type="text"
                                value={updatedCourse.description}
                                onChange={(e) =>
                                    setUpdatedCourse({ ...updatedCourse, description: e.target.value })
                                }
                                placeholder="Description"
                                className="border border-gray-300 p-2 rounded-xl w-full mb-3 text-black bg-white shadow-sm"
                                required
                            />

                            <input
                                type="number"
                                value={updatedCourse.price}
                                onChange={(e) =>
                                    setUpdatedCourse({ ...updatedCourse, price: e.target.value })
                                }
                                placeholder="Price"
                                className="border border-gray-300 p-2 rounded-xl w-full mb-3 text-black bg-white shadow-sm"
                                required
                            />

                            <input
                                type="text"
                                value={updatedCourse.imageLink}
                                onChange={(e) =>
                                    setUpdatedCourse({ ...updatedCourse, imageLink: e.target.value })
                                }
                                placeholder="Image Link"
                                className="border border-gray-300 p-2 rounded-xl w-full mb-5 text-black bg-white shadow-sm"
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold bg-white/60 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-200 cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default UpdateCourse;
