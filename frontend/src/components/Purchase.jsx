import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config";


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
                const res = await axios.get(
                    `${API_BASE_URL}/user/my-course`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // const data = await res.json();
                setPurchases(res.data.purchases || []);
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
        <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((p, index) => {
                const image =
                    courseImages[index % courseImages.length];

                return (
                    <div
                        key={p._id}
                        className="bg-white rounded-xl overflow-hidden cursor-pointer p-2 
                       transition transform hover:-translate-y-2 hover:shadow-xl"
                    >
                        <img
                            src={image}
                            alt="Course"
                            className="w-full h-48 object-cover rounded-sm mb-3"
                        />

                        <div className="p-5 text-center text-gray-900">
                            <h2 className="text-xl font-bold">
                                {p.courseId?.title || "Course not found"}
                            </h2>

                            <p className="text-gray-600 text-sm">
                                {p.courseId?.description || ""}
                            </p>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Purchase;
