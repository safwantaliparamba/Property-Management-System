import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../components/functions"

const initialState = {
    //if theme already set then it will take that value or the default value - LIGHT
    theme: getItem("THEME") ?? 'DARK', // LIGHT or DARK
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeTheme: (state, { payload }) => {
            const { theme } = payload;
            state.theme = theme

            setItem('THEME', theme)
        }
    }
})

export default uiSlice.reducer

export const { changeTheme } = uiSlice.actions 