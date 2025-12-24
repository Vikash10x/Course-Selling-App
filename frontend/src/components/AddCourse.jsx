import React, { useState, useEffect } from 'react'
import "../index.css";


const AddCourse = () => {
    const [open, setOpen] = useState(false);

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        price: "",
    });

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
            // alert(data.message || "Course added successfully!");

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

    const handleOverlayClick = (e) => {
        if (e.target.id === "overlay") {
            setOpen(false);
        }
    };

    return (
        <div>
            <div className="text-center">
                <button
                    onClick={() => setOpen(true)}
                    className="btn w-full"
                >
                    Add Course
                </button>
            </div>

            {open && (
                <div
                    id="overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 "
                >
                    <div
                        className="bg-white p-6 rounded-2xl shadow-lg w-90 sm:w-96  border border-red-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center text-black">
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

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 rounded-xl border border-red-400 text-red-600 font-semibold 
                   hover:bg-red-50 hover:scale-105 transition-all duration-200 shadow-sm cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold 
                   hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-md cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddCourse