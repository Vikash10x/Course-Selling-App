const isProduction = window.location.hostname !== "localhost";

export const API_BASE_URL = isProduction
    ? "https://course-selling-app-ht6d.onrender.com/api/v1"
    : "http://localhost:3000/api/v1";
