import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        setOpen(false);
    };

    return (
        <nav className="bg-[#101828] text-white px-5 py-4 fixed top-0 left-0 w-full z-50">
            <div className="flex justify-between items-center">

                <h1 className="text-2xl font-bold">Course Selling App</h1>

                <button
                    className="md:hidden text-2xl text-white focus:outline-none "
                    onClick={() => setOpen(!open)}
                >
                    {open ? "✖" : "☰"}
                </button>

                <div className="hidden md:flex items-center">
                    {!token && (
                        <>
                            <Link to="/signup" className="mr-5">
                                <button className="btn">Signup</button>
                            </Link>
                            <Link to="/signin">
                                <button className="btn">Signin</button>
                            </Link>
                        </>
                    )}

                    {token && (
                        <>
                            <Link to="/course">
                                <button className="btn mr-3">All Courses</button>
                            </Link>
                            <AddCourse />
                            <Link to="/purchase">
                                <button className="btn mx-3">My Courses</button>
                            </Link>
                            <button className="btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            {open && (
                <div className="md:hidden mt-4 flex flex-col space-y-3">
                    {!token && (
                        <>
                            <Link to="/signup" onClick={() => setOpen(false)}>
                                <button className="btn w-full">Signup</button>
                            </Link>
                            <Link to="/signin" onClick={() => setOpen(false)}>
                                <button className="btn w-full">Signin</button>
                            </Link>
                        </>
                    )}

                    {token && (
                        <>
                            <Link to="/course" onClick={() => setOpen(false)}>
                                <button className="btn w-full">All Courses</button>
                            </Link>

                            <AddCourse />

                            <Link to="/purchase" onClick={() => setOpen(false)}>
                                <button className="btn w-full">My Courses</button>
                            </Link>

                            <button
                                className="btn w-full"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
