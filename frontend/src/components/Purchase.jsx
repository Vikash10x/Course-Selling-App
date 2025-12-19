import React, { useEffect, useState } from "react";

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                    "http://localhost:3000/api/v1/user/my-course",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                setPurchases(data.purchases || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return (
            <p className="text-white text-center mt-10">Loading...</p>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.length === 0 ? (
                <h2 className="text-xl font-bold text-white">
                    No Purchased Courses
                </h2>
            ) : (
                purchases
                    .filter(p => p.courseId)
                    .map((p) => (
                        <div
                            key={p._id}
                            className="border border-white p-4 rounded-xl text-center text-white bg-gray-800"
                        >
                            <img
                                src={
                                    p.courseId.image ||
                                    "https://100x-b-mcdn.akamai.net.in/images/ds.jpeg"
                                }
                                alt="Course"
                                className="rounded-lg w-full h-40 mb-2 object-cover"
                            />

                            <h2 className="text-2xl font-bold mb-2">
                                {p.courseId.title}
                            </h2>

                            <p className="text-sm text-gray-300">
                                {p.courseId.description}
                            </p>
                        </div>
                    ))
            )}
        </div>
    );
};

export default Purchase;
