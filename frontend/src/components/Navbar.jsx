
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // console.log("token: ", token);


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <>
            <nav className="bg-gray-900 text-white p-5 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Course App</h1>

                <div className="space-x-6">
                    <Link to="/"></Link>

                    {!token && (
                        <>
                            <Link to="/signup"><button>Signup</button></Link>
                            <Link to="/signin"><button>Signin</button></Link>
                        </>
                    )}

                    {token && (
                        <div className="border border-white">
                            <AddCourse />
                            <Link to="/course"><button>Courses</button></Link>
                            <Link to="/purchase" className="ml-5"><button>My Courses</button></Link>
                            <button className="ml-5"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
