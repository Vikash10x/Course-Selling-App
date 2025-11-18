import React, { useState } from "react";
import "../App.css";
import { data, useNavigate } from 'react-router';

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form", formData);

        fetch("http://localhost:3000/api/v1/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "SignUp Successful") {
                    setError("")
                    navigate("/signin")
                } else {
                    setError(data.message)
                }
            })

    };

    return (
        <div className="bg-white rounded-2xl p-8 w-1/4 max-w-md m-auto mt-10">
            <div>
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
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <div className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-gray-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    <p className='text-red-500'>{error}</p>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
