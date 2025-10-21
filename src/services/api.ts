import axios from "axios";
import { toast } from "react-hot-toast"; // optional for user-friendly errors

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true, // required for cookies
});

// Response interceptor for errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            console.warn("Unauthorized request - session expired?");
        } else if (status >= 400 && status < 500) {
            toast.error(error.response?.data?.message || "Request failed");
        } else {
            console.error("Server error:", error);
        }

        return Promise.reject(error);
    }
);

export default api;
