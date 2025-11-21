import React, { useState } from 'react'

const Delete = ({ id, setCourses }) => {
    const [showModal, setShowModal] = useState(false);


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
        // alert(data.message);

        setCourses((prev) => prev.filter((c) => c._id !== id));
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
            >
                Delete
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 w-80 text-center">
                        <h2 className="text-xl font-semibold mb-4 text-black">
                            Are you sure you want to delete this course?
                        </h2>

                        <div className="flex justify-center gap-5">
                            <button
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    handleDelete(id);
                                    setShowModal(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Delete