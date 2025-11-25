import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const List = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();

    const course = state?.course;

    const handleList = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin")
        }

        try {
            const res = await fetch(`http://localhost:3000/api/v1/user/list/${id}`, {
                // method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setUserList(data.list);

        } catch (error) {
            console.log("List error", error);
        }
    };

    useEffect(() => {
        handleList();
    }, [])



    return (
        <div className="p-4">
            <h1 className="text-3xl text-white font-bold mb-4">
                {course?.title}
            </h1>

            <p className="text-gray-300 mb-4">{course?.description}</p>
        </div>
    );
};

export default List;
