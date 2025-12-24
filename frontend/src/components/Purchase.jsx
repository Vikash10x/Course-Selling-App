import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const courseImages = [
    "/Images/img1.jpg",
    "/Images/img2.png",
    "/Images/img3.webp",
    "/Images/img4.webp",
    "/Images/img5.webp",
];

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
        return <p className="text-white text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-700 mt-16 sm:mt-18">
            {purchases.map((p, index) => {
                const image =
                    courseImages[index % courseImages.length];

                return (
                    <div
                        key={p._id}
                        className="bg-gray-800 p-4 text-white rounded-sm text-center"
                    >
                        <img
                            src={image}
                            alt="Course"
                            className="w-full h-48 object-cover rounded-sm mb-3"
                        />

                        <h2 className="text-xl font-bold">
                            {p.courseId.title}
                        </h2>

                        <p className="text-gray-300 text-sm">
                            {p.courseId.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Purchase;
