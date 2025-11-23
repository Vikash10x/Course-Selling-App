
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

                <div>
                    <Link to="/"></Link>

                    {!token && (
                        <>
                            <Link to="/signup" className="mr-5"><button className="btn">Signup</button></Link>
                            <Link to="/signin"><button className="btn">Signin</button></Link>
                        </>
                    )}

                    {token && (
                        <div className="flex justify-center items-center">
                            <Link to="/course"><button className="btn">Courses</button></Link>
                            <AddCourse />
                            <Link to="/purchase"><button className="btn">My Courses</button></Link>
                            <button className="ml-5 btn"
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
