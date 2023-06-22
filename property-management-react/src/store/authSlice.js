import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../components/functions";


const initialState = {
    name: getItem("name"),
    email: getItem("email"),
    username: getItem("username"),
    accessToken: getItem("accessToken"),
    refreshToken: getItem("refreshToken"),
    isLandlord: getItem("isLandlord") ?? false,
    isAuthenticated: getItem("isAuthenticated") ?? false,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email, name, username, accessToken, refreshToken, isLandlord } = payload

            setItem("name", name)
            setItem("email", email)
            setItem("username", username)
            setItem("isAuthenticated", true)
            setItem("isLandlord", isLandlord)
            setItem("accessToken", accessToken)
            setItem("refreshToken", refreshToken)

            return { ...state, ...payload, isAuthenticated: true }
        },
        editUserData: (state, { payload }) => {
            const { name = state.name, email = state.email, username = state.username } = payload

            setItem("name", name)
            setItem("email", email)
            setItem("username", username)

            return { ...state, ...payload }
        },
        logout: (state) => {
            localStorage.clear()

            return { ...initialState, isAuthenticated: false }
        }
    }
})

export default authSlice.reducer

export const { login, logout, editUserData } = authSlice.actions
