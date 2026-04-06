import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

const Buy = ({ id }) => {
    const [showModal, setshowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        setLoading(true);
        try {
            // Step 1: Create Razorpay order from backend
            const orderRes = await fetch(`${API_BASE_URL}/payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ courseId: id }),
            });

            const orderData = await orderRes.json();

            if (!orderData.success) {
                alert(orderData.message || "Failed to initiate payment");
                setLoading(false);
                return;
            }

            // Step 2: Open Razorpay checkout popup
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "CourseHub",
                description: orderData.courseName,
                order_id: orderData.orderId,
                handler: async function (response) {
                    // Step 3: Verify payment on backend
                    const verifyRes = await fetch(`${API_BASE_URL}/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId: id,
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("🎉 Course purchased successfully! Go to My Courses.");
                        navigate("/purchase");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {},
                theme: {
                    color: "#601b99",
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setshowModal(true)}
                className='btn-premium w-full shadow-[0_0_15px_rgba(96,27,153,0.3)]'
            >
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
                            <h2 className="text-xl font-semibold mb-2 text-black">
                                Confirm Purchase
                            </h2>
                            <p className="text-sm text-gray-500 mb-5">
                                You'll be redirected to a secure payment page.
                            </p>

                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={() => setshowModal(false)}
                                    className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold 
                                    bg-white/60 hover:bg-red-50 hover:border-red-400 hover:text-red-600
                                    transition-all duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        setshowModal(false);
                                        handlePayment();
                                    }}
                                    disabled={loading}
                                    className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold 
                                    shadow-md hover:bg-green-700 transition-all duration-200 cursor-pointer
                                    disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Processing..." : "Pay Now"}
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