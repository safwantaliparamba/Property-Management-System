import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Outlet } from "react-router-dom"
// import { useSelector } from 'react-redux'

const Home = () => {
    // const { theme } = useSelector(state => state.ui)

    return (
        <>
            <Helmet>
                <title>Home | RentWise</title>
            </Helmet>
            <Wrapper>
                <h1>Home</h1>
            </Wrapper>
            <Outlet />
        </>
    )
}

export default Home

const Wrapper = styled.section`

`