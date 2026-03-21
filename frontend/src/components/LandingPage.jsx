import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/Selector/userEmail";
import { userLoggedInState } from "../store/Selector/userLogin";
import { motion } from "framer-motion";

function LandingPage() {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(userLoggedInState);

    return (
        <div className="w-full min-h-screen flex items-center justify-center">

            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div>
                        <div className="mt-20 p-20 disabled:not-only: ">

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-white text-[34px] font-normal">
                                    CourseHub User
                                </h4>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h6 className="text-white text-[15px] mt-1">
                                    A place where you Upskill yourself
                                </h6>
                            </motion.div>

                            {!userEmail && !userLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex gap-2 mt-8">
                                        <button
                                            className="button-btn"
                                            onClick={() => navigate("/signup")}
                                        >
                                            Sign Up
                                        </button>

                                        <button
                                            className="button-btn"
                                            onClick={() => navigate("/signin")}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="https://i.ibb.co/3R4Z494/course-Hubuser.png"
                                alt="CourseHub illustration"
                                className="w-[75%] md:w-[80%] landingpic"
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LandingPage;
