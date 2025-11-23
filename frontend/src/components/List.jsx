import React from "react";
import { useNavigate } from "react-router-dom";


const List = ({ course }) => {
    const navigate = useNavigate();

    const handleList = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:3000/api/v1/user/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: course.title,
                    description: course.description,
                    courseId: course._id,
                }),
            });

            const data = await res.json();
            console.log("List Response:", data);

            navigate(`/list/${course._id}`);

        } catch (error) {
            console.log("List Error:", error);
        }
    };


    return (
        <button
            onClick={handleList}
            className="btn"
        >
            List
        </button>
    );
};

export default List;
