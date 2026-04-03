import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress,
    Typography,
    List as MUIList,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import "./courseStyle.css";

const fallbackImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
];


function Courses() {

    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [course, setCourse] = useState({});

    // Prioritize API image, then state image, then fallback
    const imageToDisplay = course?.imageLink || state?.image || fallbackImages[0];

    const [loading, setLoading] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${API_BASE_URL}/user/list/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("API DATA:", res.data);

            if (res.data?.list?.length > 0) {
                setCourse(res.data.list[0]);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const handleBuyNow = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${API_BASE_URL}/user/purchase`,
                { courseId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("Course Purchased Successfully");
                setIsPurchased(true);
            }
        } catch (err) {
            toast.error("Purchase failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-vh-100 mt-40">
                <CircularProgress style={{ color: "#b388ff" }} />
            </div>
        );
    }
    if (!course) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col lg:flex-row gap-12 mt-10"
            >
                {/* Main Content */}
                <div className="flex-1 space-y-8 glass-panel p-8 rounded-3xl">
                    <div className="course-image-container relative rounded-2xl overflow-hidden h-80 shadow-2xl">
                        <img
                            src={imageToDisplay}
                            alt="Course"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold premium-heading leading-tight">
                            {course?.title || state?.title}
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {course?.description || state?.description}
                        </p>
                    </div>

                    {localStorage.getItem("role") !== "admin" && (
                        <div className="pt-6">
                            {!isPurchased ? (
                                <button
                                    className="btn-premium w-full md:w-auto px-12 py-4 text-xl shadow-[0_0_30px_rgba(96,27,153,0.4)]"
                                    onClick={handleBuyNow}
                                >
                                    Enroll Now for ${course?.price || state?.price}
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button className="px-8 py-4 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 font-bold">
                                        ✓ Enrolled
                                    </button>
                                    <button className="btn-premium px-8 py-4">
                                        Start Learning
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="w-full lg:w-[400px]"
                >
                    <div className="glass-panel rounded-3xl overflow-hidden sticky top-24">
                        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 border-b border-white/5">
                            <h3 className="text-2xl font-bold text-white text-center">
                                Course Features
                            </h3>
                        </div>
                        
                        <div className="p-4">
                            <MUIList sx={{ '& .MuiListItemIcon-root': { color: '#b388ff', minWidth: '40px' }, '& .MuiTypography-root': { color: '#e2e8f0', fontWeight: 500 } }}>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors">
                                        <ListItemIcon><SignalCellularAltIcon /></ListItemIcon>
                                        <ListItemText primary="Beginner to Pro Level" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><OndemandVideoIcon /></ListItemIcon>
                                        <ListItemText primary="20+ Hours of HD video" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                                        <ListItemText primary="150+ Interactive Lessons" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><DownloadIcon /></ListItemIcon>
                                        <ListItemText primary="Downloadable resources" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><ClosedCaptionIcon /></ListItemIcon>
                                        <ListItemText primary="English Captions" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><MilitaryTechIcon /></ListItemIcon>
                                        <ListItemText primary="Certificate of Completion" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton className="hover:bg-white/5 rounded-xl transition-colors mt-1">
                                        <ListItemIcon><AllInclusiveIcon /></ListItemIcon>
                                        <ListItemText primary="Full Lifetime Access" />
                                    </ListItemButton>
                                </ListItem>
                            </MUIList>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Courses;
