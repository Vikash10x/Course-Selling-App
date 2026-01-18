import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import "./courseStyle.css";

function Courses() {

    const { id } = useParams();
    const { state } = useLocation();
    // console.log("Sta: ", state);
    const navigate = useNavigate();

    const image = state?.image || "/Images/img1.jpeg";
    // const price = state?.price || 0;
    const [loading, setLoading] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    // const [buyLoading, setBuyLoading] = useState(false);

    const [course, setCourse] = useState({});
    // const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [isPurchased, setIsPurchased] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:3000/api/v1/user/list/${id}`,
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
                "http://localhost:3000/api/v1/user/purchase",
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "300px",
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }
    if (!course) return null;

    return (
        <div className="single-course" >
            <div className="text-container">
                <div>
                    <img
                        src={image}
                        alt="Course"
                        width={"200px"}
                        style={{ borderRadius: "20px" }}
                    />
                </div>
                <div>
                    <h5 style={{ color: "white", fontSize: "25px" }}>{course?.title}</h5>
                </div>

                <div>
                    <p style={{ color: "white", fontSize: "10px", fontStyle: "italic" }}>
                        {course?.description}
                    </p>
                </div>

                <div>
                    {!isPurchased ? (
                        <button
                            className="button-btn"
                            style={{ width: "180px" }}
                            onClick={handleBuyNow}
                        >
                            BUY NOW @${course?.price}
                        </button>
                    ) : (
                        <div>
                            <button
                                style={{
                                    backgroundColor: "green",
                                    padding: "10px 20px",
                                    fontWeight: "700",
                                    fontSize: "15px !important",
                                    borderRadius: "50px",
                                    color: "white",
                                    borderWidth: "0px"
                                }}
                            >
                                Purchased
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#1E267A",
                                    padding: "10px 20px",
                                    fontWeight: "700",
                                    fontSize: "15px !important",
                                    borderRadius: "50px",
                                    color: "white",
                                    borderWidth: "0px",
                                    marginLeft: "20px",
                                }}
                            >
                                View Content
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Card
                    className="cardstyle"
                    variant="outlined"
                    sx={{ width: "350px", height: "440px" }}
                    style={{
                        backgroundColor: "#601b99",
                        color: "white",
                        borderRadius: "10px",
                        display: "flex",
                        padding: "5px",
                    }}
                >
                    <CardActionArea>
                        <CardContent style={{ textAlign: "center" }}>
                            <Typography gutterBottom variant="h6" component="div" >
                                Course Overview
                            </Typography>
                            <br />
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    color: "black",
                                    borderRadius: "20px",
                                    padding: "5px 2px",
                                }}
                            >
                                <nav aria-label="main mailbox folders">
                                    <List style={{ padding: "5px" }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <SignalCellularAltIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Beginner to Pro" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <OndemandVideoIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="20+ Hours of HD video" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <FormatListBulletedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="150+ Lessons" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DownloadIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Downloadable content" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <ClosedCaptionIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="English captions" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <MilitaryTechIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Certificate of completion" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <AllInclusiveIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Lifetime access" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </nav>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    );
}

export default Courses;
