import React, { useState, useEffect } from "react";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/v1/admin/course", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.courses && data.courses.length > 0) {
                    setCourses(data.courses);
                }
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchData();
    }, []);


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
        alert(data.message);
        // console.log(data.message);
    }


    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:3000/api/v1/admin/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        alert(data.message);

        setCourses((prev) => prev.filter((c) => c._id !== id));
    };

    // const role = localStorage.getItem("role");


    return (
        <div className="min-h-screen bg-gray-700 p-10 relative">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                Available Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {courses.map((course) => (
                    <nav
                        key={course._id}
                        className="w-72 p-4 rounded-xl text-center text-white bg-gray-800"
                    >
                        <img
                            src="https://100x-b-mcdn.akamai.net.in/images/ds.jpeg"
                            alt="Course"
                            className="rounded-lg w-full h-40 mb-2"
                        />
                        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                        <p className="text-sm">{course.description}</p>
                        <p className="text-sm mt-1 mb-2">Price: ₹{course.price}</p>
                        <button
                            onClick={() => handleBuy(course._id)}>
                            Buy Now
                        </button>


                        {/* // ----------Delete Button --------- // */}
                        {/* {role === "admin" && ( */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="ml-5"
                        >
                            Delete
                        </button>
                        {/* )} */}

                        {showModal && (
                            <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center">
                                <div className="bg-white rounded-xl p-6 w-80 text-center">
                                    <h2 className="text-xl font-semibold mb-4 text-black">
                                        Are you sure you want to delete this course?
                                    </h2>

                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                handleDelete(course._id);
                                                setShowModal(false);
                                            }}
                                            className=""
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                ))}
            </div>
        </div >
    );
};

export default Course;
