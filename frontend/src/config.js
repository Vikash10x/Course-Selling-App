const isProduction = window.location.hostname !== "localhost";

export const API_BASE_URL = isProduction
    ? "/api/v1"
    : "https://course-selling-app-ht6d.onrender.com/course";
