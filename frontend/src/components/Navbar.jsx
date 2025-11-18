
import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <nav className="bg-gray-900 text-white p-10 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Course App</h1>

                <div className="space-x-6">
                    <Link to="/" className="hover:text-blue-700"></Link>
                    <Link to="/course" className="hover:text-blue-700"><button>Courses</button></Link>
                    <Link to="/purchase" className="hover:text-red-700"><button>My-Courses</button></Link>

                    {!token && (
                        <>
                            <Link to="/signup" className="hover:text-green-700"><button>Signup</button></Link>
                            <Link to="/signin" className="hover:text-yellow-700"><button>Signin</button></Link>
                        </>
                    )}

                    {token && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
