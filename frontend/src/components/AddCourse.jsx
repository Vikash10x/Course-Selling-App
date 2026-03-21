import React, { useState } from "react";
import "../index.css";

const AddCourse = () => {
    const [open, setOpen] = useState(false);

    const role = localStorage.getItem("role");

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        price: "",
        imageLink: "",
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
            console.log(data);

            setNewCourse({ title: "", description: "", price: "", imageLink: "" });
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
            {role === "admin" && (
                <button
                    className="button-nav"
                    style={{ width: "100px", marginLeft: 10 }}
                    onClick={() => setOpen(true)}
                >
                    Add Course
                </button>
            )}


            {open && (
                <div
                    id="overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div
                        className="bg-[#efefef] p-6 rounded-2xl shadow-lg w-90 sm:w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center text-black">
                            Add New Course
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={newCourse.title}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, title: e.target.value })
                                }
                                placeholder="Course Name"
                                className="border p-2 rounded w-full mb-3"
                                required
                            />

                            <input
                                type="text"
                                value={newCourse.description}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, description: e.target.value })
                                }
                                placeholder="Description"
                                className="border p-2 rounded w-full mb-3"
                                required
                            />

                            <input
                                type="number"
                                value={newCourse.price}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, price: e.target.value })
                                }
                                placeholder="Price"
                                className="border p-2 rounded w-full mb-3"
                                required
                            />

                            <input
                                type="text"
                                value={newCourse.imageLink}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, imageLink: e.target.value })
                                }
                                placeholder="Image Link"
                                className="border p-2 rounded w-full mb-3"
                                required
                            />

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 rounded-xl border border-red-400 text-red-600 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-green-600 text-white cursor-pointer"
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

export default AddCourse;
