import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";

const Signin = () => {
    const [formdata, setFormdata] = useState({ email: "", password: "" });
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

        fetch(`${API_BASE_URL}/user/signin`, {
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
            .catch((err) => {
                console.error("Login Fetch Error:", err);
                setError("Something went wrong");
            });
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center auth-container z-50 pt-16"
            onClick={() => navigate(-1)}
        >
            <motion.form
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="space-y-6 glass-panel rounded-2xl p-8 max-w-md w-full mx-4"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold premium-heading mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-400 text-sm">Sign in to continue your learning journey</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-medium mb-1.5 text-sm ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl glass-input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-gray-300 font-medium text-sm ml-1">
                                Password
                            </label>
                            <span className="text-purple-400 hover:text-purple-300 text-xs cursor-pointer transition-colors">
                                Forgot password?
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={formdata.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass-input pr-10"
                                placeholder="Enter your password"
                            />

                            <span
                                className="absolute right-3 top-3.5 cursor-pointer text-xl text-gray-400 hover:text-white transition-colors"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center"
                    >
                        {error}
                    </motion.p>
                )}

                <button
                    type="submit"
                    className="w-full btn-premium py-3.5 text-lg mt-4 shadow-[0_0_20px_rgba(96,27,153,0.3)]"
                >
                    Sign In
                </button>

                <div className="text-center mt-6 text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <span
                        className="text-purple-400 cursor-pointer font-medium hover:text-purple-300 transition-colors"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </div>
            </motion.form>
        </div>
    );
};

export default Signin;
