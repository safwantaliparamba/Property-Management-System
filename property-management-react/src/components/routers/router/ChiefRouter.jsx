import React from 'react'
import { styled } from 'styled-components'
import { Route, Routes } from 'react-router-dom'

import LeftSideBar from '../../includes/home/LeftSideBar'
import LandlordHome from '../../screens/landlord/LandlordHome'


const ChiefRouter = () => {
    return (
        <ChiefWrapper>
            <LeftSideBar />
            <ChiefContainer>
                <Routes>
                    <Route index element={<LandlordHome />} />
                </Routes>
            </ChiefContainer>
        </ChiefWrapper>
    )
}

export default ChiefRouter

const ChiefWrapper = styled.section`
    display: flex;
`

const ChiefContainer = styled.div`
    width: 82%;
`