import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/Selector/userEmail";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AddCourse from "./AddCourse";

export default function Appbar() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useRecoilState(userState);
    const userEmail = useRecoilValue(userEmailState);
    const navigate = useNavigate();

    return (
        <>
            {token && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        itemsAlign: "center",
                        padding: 10,
                        zIndex: 1,
                        // marginTop: "8px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 10,
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                    >
                        <Typography
                            style={{ color: "white", fontFamily: "Kaushan Script" }}
                            variant="h6"
                        >
                            CourseHub
                        </Typography>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginRight: 10 }}>
                        <button
                            className="button-nav"
                            style={{ width: "100px", marginLeft: 10 }}
                            onClick={() => navigate("/course")}
                        >
                            All courses
                        </button>

                        <AddCourse />

                        <button
                            className="button-nav"
                            style={{ width: "100px", marginLeft: 10 }}
                            onClick={() => navigate("/purchase")}
                        >
                            My Courses
                        </button>

                        <button
                            className="button-btn"
                            style={{ width: "90px", height: "35px", marginLeft: 10 }}
                            onClick={() => {
                                localStorage.clear();
                                setUser({
                                    email: "",
                                    password: "",
                                    username: "",
                                    isLoggedIn: false,
                                });
                                navigate("/");
                            }}
                        >
                            Logout
                        </button>

                        <Tooltip title={userEmail}>
                            <IconButton>
                                <Avatar
                                    sx={{
                                        bgcolor: "whitesmoke",
                                        color: "purple",
                                        width: 35,
                                        height: 35,
                                        ml: 1,
                                    }}
                                >
                                    {userEmail?.[0]?.toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            )}

            {!token && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 10,
                        zIndex: 1,
                        overflow: "auto",
                        marginLeft: "20px",
                        marginRight: "20px",
                        // marginTop: "8px",
                        // border: "5px solid #601b99"
                    }}
                >
                    <Typography
                        style={{
                            color: "white",
                            fontFamily: "Kaushan Script",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/")}
                        variant="h5"
                    >
                        CourseHub
                    </Typography>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            className="button-nav"
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </button>

                        <button
                            className="button-nav"
                            style={{ marginLeft: 10 }}
                            onClick={() => navigate("/signin")}
                        >
                            Signin
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}









// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AddCourse from "./AddCourse";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     const [open, setOpen] = useState(false);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//         setOpen(false);
//     };

//     return (
//         <nav className="bg-[#101828] text-white px-5 py-4 fixed top-0 left-0 w-full z-50">
//             <div className="flex justify-between items-center">

//                 <h1 className="text-2xl font-bold">Course Selling App</h1>

//                 <button
//                     className="md:hidden text-2xl text-white focus:outline-none "
//                     onClick={() => setOpen(!open)}
//                 >
//                     {open ? "✖" : "☰"}
//                 </button>

//                 <div className="hidden md:flex items-center">
//                     {!token && (
//                         <>
//                             <Link to="/signup" className="mr-5">
//                                 <button className="button-btn">Signup</button>
//                             </Link>
//                             <Link to="/signin">
//                                 <button className="button-btn">Signin</button>
//                             </Link>
//                         </>
//                     )}

//                     {token && (
//                         <>
//                             <Link to="/course">
//                                 <button className="button-btn mr-3">All Courses</button>
//                             </Link>
//                             <AddCourse />
//                             <Link to="/purchase">
//                                 <button className="button-btn mr-3">My Courses</button>
//                             </Link>
//                             <button className="button-btn" onClick={handleLogout}>
//                                 Logout
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>

//         </nav>
//     );
// };

