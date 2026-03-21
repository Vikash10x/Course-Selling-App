import React, { useState, useEffect } from "react";
import Delete from "./Delete";
import Buy from "./Buy";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";


const courseImages = [
    "/Images/img1.jpg",
    "/Images/img2.png",
    "/Images/img3.webp",
    "/Images/img4.webp",
    "/Images/img5.webp",
];

const Course = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/admin/course`, {

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
        <div className="p-10 min-h-screen">
            <h1 className="text-white text-3xl font-bold text-center mb-12">
                Available Courses
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => {
                    const fallbackImage = courseImages[index % courseImages.length];
                    const image = course.imageLink || fallbackImage;

                    return (
                        <div
                            key={course._id}
                            onClick={() =>
                                navigate(`/course/${course._id}`, {
                                    state: {
                                        image,
                                        description: course.description,
                                        price: course.price,
                                    },
                                })
                            }
                            className="bg-white rounded-xl overflow-hidden cursor-pointer p-2 
                       transition transform hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Image */}
                            <img
                                src={image}
                                alt="Course"
                                className="w-full h-48 object-fill rounded-sm"
                            />

                            {/* Content */}
                            <div className="p-5 text-center">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {course.title}
                                </h2>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Actions */}
                                <div className="flex justify-center gap-4 mt-6">
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
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default Course;
