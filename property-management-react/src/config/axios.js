import axios from "axios";
import { getItem } from "../components/functions";

const URL = "http://localhost:8000/api/v1"

const api = axios.create({
    baseURL: URL
})

const authApi = axios.create({
    baseURL: URL,
})

// middleware to add accessToken as auth credential
authApi.interceptors.request.use((request) => {
    const accessToken = getItem("accessToken");

    request.headers.Authorization = `Bearer ${accessToken}`

    return request
})

export default api
export { authApi }