import React, { useEffect, useState } from 'react';

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/api/v1/user/my-course", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            setPurchases(data.purchases || []);
            setLoading(false);
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return <h2 className="text-xl font-bold text-white">Loading...</h2>;
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.length === 0 ? (
                <h2 className="text-xl font-bold text-white">No Purchased Courses</h2>
            ) : (
                purchases
                    .filter(p => p.courseId)
                    .map((p) => (
                        <div
                            key={p._id}
                            className="border border-white w-72 p-4 rounded-xl text-center text-white bg-gray-800"
                        >
                            <img
                                src="https://100x-b-mcdn.akamai.net.in/images/ds.jpeg"
                                alt="Course"
                                className="rounded-lg w-full h-40 mb-2"
                            />
                            <h2 className="text-2xl font-bold mb-2">{p.courseId?.title}</h2>
                            <p className="text-sm">{p.courseId?.description}</p>
                        </div>
                    ))
            )}
        </div>
    );
};

export default Purchase;
