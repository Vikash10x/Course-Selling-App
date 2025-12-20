import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Buy from "./Buy";
import { useNavigate } from "react-router-dom";

const courseImages = [
    "/Images/img1.jpeg",
    "/Images/img2.jpeg",
    "/Images/img3.jpeg",
];

const Course = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/v1/admin/course", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (data.courses) {
                    setCourses(data.courses);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-gray-700 p-6 min-h-screen">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                Available Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {courses.map((course, index) => {
                    const image = courseImages[index % courseImages.length];

                    return (
                        <div
                            key={course._id}
                            onClick={() =>
                                navigate(`/course/${course._id}`, {
                                    state: { image, price: course.price },
                                })
                            }
                            className="bg-gray-800 p-3 rounded-sm text-white cursor-pointer hover:scale-105 duration-200 text-center"
                        >
                            <img
                                src={image}
                                alt="Course"
                                className="w-full h-40 object-cover rounded-sm mb-3"
                            />

                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <p className="text-sm text-gray-300">{course.description}</p>

                            <p className="mt-2 font-semibold">₹{course.price}</p>

                            <div className="flex justify-center gap-6 mt-5">
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Buy id={course._id} setCourses={setCourses} />
                                </div>

                                {localStorage.getItem("role") === "admin" && (
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Delete id={course._id} setCourses={setCourses} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Course;
