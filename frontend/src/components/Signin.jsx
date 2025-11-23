import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

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
        console.log(formdata);

        fetch("http://localhost:3000/api/v1/user/signin", {
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
                        console.log("Roleeeee: ", data.role);
                    }

                    setError("");
                    setTimeout(() => navigate("/course"), 200);

                } else {
                    setError(data.message);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='bg-white rounded-2xl p-8 w-1/4 max-w-md text-black m-auto mt-10'>
            <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <div className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </div>
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
                    <div className="block text-gray-700 font-medium mb-2">
                        Password
                    </div>

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
                            className="absolute right-3 top-2.5 cursor-pointer text-xl z-10"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>

                    </div>
                </div>

                <p className='text-red-500'>{error}</p>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    SignIn
                </button>
            </form>

            <div className='mt-3'>
                Not have an account?{" "}
                <span className='text-blue-500 cursor-pointer' onClick={() => navigate("/signup")}>
                    SignUP
                </span>
            </div>
        </div>
    )
}

export default Signin;
