import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { API_BASE_URL } from "../config";


const Signup = () => {
    const [formdata, setFormdata] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API_BASE_URL}/user/signup`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);

                    if (data.role) {
                        localStorage.setItem("role", data.role);
                    }

                    setError("");
                    navigate("/course");
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("Something went wrong"));
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            onClick={() => navigate(-1)}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="space-y-5 bg-white rounded-2xl p-8 max-w-md w-full"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Sign Up
                </h2>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formdata.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                        placeholder="Enter your email"
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
                            value={formdata.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                            placeholder="Enter your password"
                        />

                        <span
                            className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-600"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Sign Up
                </button>

                <div className="text-center mt-3">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer font-medium"
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Signup;
