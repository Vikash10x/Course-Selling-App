const isProduction = window.location.hostname !== "localhost";

export const API_BASE_URL = isProduction 
    ? "/api/v1" 
    : "http://localhost:3000/api/v1";
