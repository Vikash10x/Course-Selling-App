import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/api/v1/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "SignUp Successful") {
                    setError("");
                    navigate("/signin");
                } else {
                    setError(data.message);
                }
            })
            .catch(() => {
                setError("Something went wrong");
            });
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center "
            onClick={() => navigate(-1)}
        >

            <div
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                            />
                            <span
                                className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-600"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
