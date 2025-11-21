import React, { useState } from 'react'

const Buy = ({ id }) => {
    const [showModal, setshowModal] = useState(false)


    const handleBuy = async (id) => {
        const token = localStorage.getItem("token");

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
            <button onClick={() => setshowModal(true)}>
                Buy Now
            </button>

            {showModal && (
                <div className='fixed inset-0 bg-opacity-60 flex justify-center items-center'>
                    <div className='bg-white rounded-xl p-6 w-80 text-center'>
                        <h2 className="text-xl font-semibold mb-4 text-black">
                            Are you sure you want to buy this course?
                        </h2>

                        <div className="flex justify-center gap-5">
                            <button
                                onClick={() => setshowModal(false)}
                            >
                                No
                            </button>

                            <button
                                onClick={() => {
                                    handleBuy(id);
                                    setshowModal(false);
                                }}
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