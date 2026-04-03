import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/Selector/userEmail";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AddCourse from "./AddCourse";
import { motion } from "framer-motion";

export default function Appbar() {
    const [user, setUser] = useRecoilState(userState);
    const userEmail = useRecoilValue(userEmailState);
    const navigate = useNavigate();

    // Use Recoil state for reactivity — localStorage alone won't cause re-render
    const isLoggedIn = user.isLoggedIn || !!localStorage.getItem("token");

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 glass-panel border-t-0 border-x-0 border-b border-white/10 px-4 md:px-8 py-3"
        >
            {isLoggedIn && (
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate("/")}
                    >
                        <h2 className="text-2xl font-bold premium-heading" style={{ fontFamily: "Kaushan Script" }}>
                            CourseHub
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="px-5 py-2 rounded-xl text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => navigate("/course")}
                        >
                            All Courses
                        </button>

                        <AddCourse />

                        <button
                            className="px-5 py-2 rounded-xl text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => navigate("/purchase")}
                        >
                            My Courses
                        </button>

                        <button
                            className="px-5 py-2 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors border border-red-500/20 cursor-pointer"
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
                            <IconButton className="ml-2">
                                <Avatar
                                    sx={{
                                        background: "linear-gradient(135deg, #601b99 0%, #3f1066 100%)",
                                        color: "white",
                                        width: 38,
                                        height: 38,
                                        fontWeight: "bold",
                                        boxShadow: "0 4px 10px rgba(96,27,153,0.3)"
                                    }}
                                >
                                    {userEmail?.[0]?.toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            )}

            {!isLoggedIn && (
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate("/")}
                    >
                        <h2 className="text-2xl font-bold premium-heading" style={{ fontFamily: "Kaushan Script" }}>
                            CourseHub
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="px-6 py-2 rounded-xl text-white font-medium hover:bg-white/10 transition-colors hidden sm:block cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>

                        <button
                            className="btn-premium px-6 py-2 shadow-[0_0_15px_rgba(96,27,153,0.3)] cursor-pointer"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}

