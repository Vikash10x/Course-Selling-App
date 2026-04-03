import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

const Buy = ({ id }) => {
    const [showModal, setshowModal] = useState(false)
    const navigate = useNavigate();

    const handleBuy = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return;
        }

        const res = await fetch(`${API_BASE_URL}/user/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseId: id })
        })
        const data = await res.json();
    }

    return (
        <div>
            <button onClick={() => setshowModal(true)} className='btn-premium w-full shadow-[0_0_15px_rgba(96,27,153,0.3)]'>
                Buy Now
            </button>

            <AnimatePresence>
                {showModal && (
                    <div className='fixed inset-0 bg-opacity-60 bg-black/50 flex justify-center items-center z-50'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className='bg-[#efefef] rounded-xl p-6 w-80 text-center shadow-2xl'
                        >
                            <h2 className="text-xl font-semibold mb-4 text-black">
                                Are you sure you want to buy this course?
                            </h2>

                            <div className="flex justify-center gap-5 mt-4">
                                <button
                                    onClick={() => setshowModal(false)}
                                    className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold 
                                    bg-white/60 backdrop-blur-sm shadow-sm
                                    hover:bg-red-50 hover:border-red-400 hover:text-red-600
                                    hover:scale-105 transition-all duration-200 cursor-pointer"
                                >
                                    No
                                </button>

                                <button
                                    onClick={() => {
                                        handleBuy(id);
                                        setshowModal(false);
                                    }}
                                    className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold 
                                    shadow-md hover:bg-green-700 hover:scale-105 
                                    transition-all duration-200 cursor-pointer"
                                >
                                    Yes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Buy