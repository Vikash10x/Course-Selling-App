import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const CourseDetail = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);

    useEffect(() => {
        if (!course) fetchCourseDetails();
    }, [id]);


    const fetchCourseDetails = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:3000/api/v1/user/list/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                setCourse(null);
                return;
            }

            const data = await res.json();
            console.log("API DATA ", data);

            if (data?.list && data.list.length > 0) {
                setCourse(data.list[0]);
            } else {
                setCourse(null);
            }

        } catch (err) {
            console.log(err);
            setCourse(null);
        } finally {
            setLoading(false);
        }
    };


    const handleBuy = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return;
        }

        try {
            setBuyLoading(true);

            const res = await fetch(
                "http://localhost:3000/api/v1/user/purchase",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        courseId: id,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Buy failed");
                return;
            }

            navigate("/Purchase");

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        } finally {
            setBuyLoading(false);
            setShowModal(false);
        }
    };


    if (loading) {
        return <p className="text-white text-center mt-10">Loading...</p>;
    }

    if (!course) {
        return <p className="text-white text-center mt-10">Course not found</p>;
    }


    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 border">

                <img
                    src={course.image}
                    className="rounded-xl shadow-lg"
                />

                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        {course.title}
                    </h1>

                    <p className="text-gray-300 mb-6">
                        {course.description}
                    </p>

                    <p className="text-2xl font-semibold mb-6">
                        Price: ₹{course.price}
                    </p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="py-3 px-8 rounded bg-blue-600 font-bold hover:bg-blue-800 transition cursor-pointer"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-xl p-6 w-80 text-center"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-black">
                            Are you sure you want to buy this course?
                        </h2>

                        <div className="flex justify-center gap-5 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-red-50"
                            >
                                No
                            </button>

                            <button
                                onClick={handleBuy}
                                disabled={buyLoading}
                                className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                            >
                                {buyLoading ? "Processing..." : "Yes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
