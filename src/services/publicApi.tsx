// src/services/publicApi.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const publicApi = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // ✅ no cookies needed
});

export default publicApi;
