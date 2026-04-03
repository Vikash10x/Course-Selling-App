import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

const Signup = () => {
    const [formdata, setFormdata] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [user, setUser] = useRecoilState(userState);

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
                    localStorage.setItem("isLoggedIn", "true");

                    if (data.role) {
                        localStorage.setItem("role", data.role);
                    }

                    setUser({
                        Email: formdata.email,
                        username: formdata.name,
                        isLoggedIn: true,
                    });

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
                        Create Account
                    </h2>
                    <p className="text-gray-400 text-sm">Join CourseHub and start learning today</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-medium mb-1.5 text-sm ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl glass-input"
                            placeholder="Enter your name"
                        />
                    </div>

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
                        <label className="block text-gray-300 font-medium mb-1.5 text-sm ml-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                value={formdata.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl glass-input pr-10"
                                placeholder="Create a password"
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
                    Sign Up Now
                </button>

                <div className="text-center mt-6 text-gray-400 text-sm">
                    Already have an account?{" "}
                    <span
                        className="text-purple-400 cursor-pointer font-medium hover:text-purple-300 transition-colors"
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </div>
            </motion.form>
        </div>
    );
};

export default Signup;
