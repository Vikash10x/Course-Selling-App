import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Buy = ({ id }) => {
    const [showModal, setshowModal] = useState(false)
    const navigate = useNavigate();


    const handleBuy = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return;
        }

        const res = await fetch("http://localhost:3000/api/v1/user/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseId: id })
        })
        const data = await res.json();
        // alert(data.message);
        // console.log(data.message);
    }

    return (
        <div>
            <button onClick={() => setshowModal(true)} className='btn'>
                Buy Now
            </button>

            {showModal && (
                <div className='fixed inset-0 bg-opacity-60 flex justify-center items-center'>
                    <div className='bg-white rounded-xl p-6 w-80 text-center'>
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default Buy