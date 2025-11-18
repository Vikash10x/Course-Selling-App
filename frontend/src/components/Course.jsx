import React, { useState, useEffect } from "react";

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        price: "",
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/v1/admin/course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCourse),
            });

            const data = await res.json();
            alert(data.message || "Course added successfully!");

            if (data.course) {
                setCourses([...courses, data.course]);
            }
            console.log("Data: ", data);

            setNewCourse({ title: "", description: "", price: "" });
            setOpen(false);
        } catch (err) {
            console.log("Error:", err);
            alert("Something went wrong!");
        }
    };

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

    const handleOverlayClick = (e) => {
        if (e.target.id === "overlay") {
            setOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-700 p-10 relative">
            <h1 className="text-white text-3xl font-bold text-center mb-6">
                Available Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {courses.map((course) => (
                    <nav
                        key={course._id}
                        className="border border-white w-72 p-4 rounded-xl text-center text-white bg-gray-800"
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

                        {/* {localStorage.getItem("role") === "admin" && ( */}
                        <button
                            type="button"
                            onClick={async () => {
                                const token = localStorage.getItem("token");

                                const res = await fetch(
                                    `http://localhost:3000/api/v1/admin/delete/${course._id}`,
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

                                window.location.reload();
                            }}
                            className="text-red-600  ml-5"
                        >
                            Delete
                        </button>
                        {/* )} */}

                    </nav>
                ))}
            </div>

            <div className="p-6 text-center">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Add Course
                </button>
            </div>

            {open && (
                <div
                    id="overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div
                        className="bg-white p-6 rounded-2xl shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Add New Course
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                value={newCourse.title}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, title: e.target.value })
                                }
                                placeholder="Course Name"
                                className="border p-2 rounded w-full mb-3 text-black"
                                required
                            />

                            <input
                                type="text"
                                name="description"
                                value={newCourse.description}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, description: e.target.value })
                                }
                                placeholder="Description"
                                className="border p-2 rounded w-full mb-3 text-black"
                                required
                            />

                            <input
                                type="number"
                                name="price"
                                value={newCourse.price}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, price: e.target.value })
                                }
                                placeholder="Price"
                                className="border p-2 rounded w-full mb-3 text-black"
                                required
                            />

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Course;
