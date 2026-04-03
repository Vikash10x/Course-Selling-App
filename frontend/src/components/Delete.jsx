import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

const Delete = ({ id, setCourses }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return;
        }

        const res = await fetch(
            `${API_BASE_URL}/admin/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        setCourses((prev) => prev.filter((c) => c._id !== id));
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)} className='btn-delete w-full'
            >
                Delete
            </button>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex justify-center items-center z-50">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#efefef] rounded-xl p-6 w-80 text-center shadow-2xl"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-black">
                                Are you sure you want to delete this course?
                            </h2>

                            <div className="flex justify-center gap-5 mt-4">
                                {/* Cancel Button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold 
                                    bg-white/60 backdrop-blur-sm shadow-sm
                                    hover:bg-red-50 hover:border-red-400 hover:text-red-600
                                    hover:scale-105 transition-all duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => {
                                        handleDelete(id);
                                        setShowModal(false);
                                    }}
                                    className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold 
                                    shadow-md hover:bg-green-700 hover:scale-105 
                                    transition-all duration-200 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Delete