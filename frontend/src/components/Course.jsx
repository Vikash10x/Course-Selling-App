import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Buy from "./Buy";
import { useNavigate } from "react-router";


const Course = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();


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


    return (
        <div className="h-full bg-gray-700 p-6 relative">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                Available Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {courses.map((course) => (

                    <nav onClick={() => navigate(`/course/${course._id}`, { state: { course } })}
                        key={course._id}
                        className="w-72 p-4 rounded-xl text-center text-white bg-gray-800 shadow-md cursor-pointer"
                    >
                        <img
                            src="https://100x-b-mcdn.akamai.net.in/images/ds.jpeg"
                            alt="Course"
                            className="rounded-lg w-full h-40 object-cover mb-3"
                        />

                        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                        <p className="text-sm text-gray-300">{course.description}</p>

                        <p className="text-sm mt-2 mb-4 font-semibold">
                            Price: ₹{course.price}
                        </p>

                        <div className="flex items-center justify-center gap-6">

                            {localStorage.getItem("token") && (
                                <div>
                                    <Buy id={course._id} setCourses={setCourses} />
                                </div>
                            )}

                            {localStorage.getItem("token") && localStorage.getItem("role") === "admin" && (
                                <Delete id={course._id} setCourses={setCourses} />
                            )}
                        </div>
                    </nav>
                ))}
            </div>

        </div >
    );
};

export default Course;
