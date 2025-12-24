import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

function App() {
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setShowForm(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/api/v1/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(FormData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "SignUp Successful") {
                    setError("");
                    navigate("/signin");
                } else {
                    setError(data.message);
                }
            });
    };

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div
                ref={formRef}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <div className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={FormData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        />
                    </div>

                    <div>
                        <div className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={FormData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        />
                    </div>

                    <div>
                        <div className="block text-gray-700 font-medium mb-2">
                            Password
                        </div>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={FormData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                            />
                            <span
                                className="absolute right-3 top-2.5 cursor-pointer text-xl"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                    </div>

                    <p className="text-red-500">{error}</p>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
