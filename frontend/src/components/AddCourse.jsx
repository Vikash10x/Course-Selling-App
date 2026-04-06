import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../index.css";
import { API_BASE_URL } from "../config";

const AddCourse = () => {
    const [open, setOpen] = useState(false);

    const role = localStorage.getItem("role");

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        price: "",
        imageLink: "",
        videoUrl: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/admin/course`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newCourse),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                alert("Course added successfully!");
                setNewCourse({ title: "", description: "", price: "", imageLink: "", videoUrl: "" });
                setOpen(false);
            } else {
                alert(data.message || "Failed to add course");
            }
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

            {open && createPortal(
                <div
                    id="overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex justify-center items-center z-[9999]"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div
                        className="bg-white p-6 rounded-2xl shadow-lg w-96"
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
                                className="border p-2 rounded w-full mb-3 text-black"
                                required
                            />

                            <input
                                type="text"
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
                                value={newCourse.price}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, price: e.target.value })
                                }
                                placeholder="Price"
                                className="border p-2 rounded w-full mb-3 text-black"
                                required
                            />

                            <input
                                type="text"
                                value={newCourse.imageLink}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, imageLink: e.target.value })
                                }
                                placeholder="Image Link (optional)"
                                className="border p-2 rounded w-full mb-3 text-black"
                            />

                            <input
                                type="text"
                                value={newCourse.videoUrl}
                                onChange={(e) =>
                                    setNewCourse({ ...newCourse, videoUrl: e.target.value })
                                }
                                placeholder="YouTube Video URL (optional)"
                                className="border p-2 rounded w-full mb-3 text-black"
                            />

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 rounded-xl border border-red-400 text-red-600 cursor-pointer hover:bg-red-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-green-600 text-white cursor-pointer hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default AddCourse;
