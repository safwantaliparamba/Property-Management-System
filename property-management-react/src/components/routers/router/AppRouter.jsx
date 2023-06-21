//react and third party imports
import React from 'react'
import { Route, Routes } from "react-router-dom";

// local imports 


const AppRouter = () => {
    return (
        <Routes>
            <Route path='' element={<Home />} />
        </Routes>
    )
}

export default AppRouter

const Home = ({}) =>{
    return (
        <>
            <h1>Home</h1>
        </>
    )
}