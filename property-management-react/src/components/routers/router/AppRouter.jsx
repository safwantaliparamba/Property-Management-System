//react and third party imports
import React from 'react'
import { Route, Routes } from "react-router-dom";
// local imports 
import Home from '../../screens/customer/Home';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import Header from '../../includes/home/Header';
import LandlordHome from '../../screens/landlord/LandlordHome';
import Category from '../../screens/customer/Category';
import RentalSingle from '../../screens/customer/RentalSingle';
import LeftSideBar from '../../includes/home/LeftSideBar';
import ChiefRouter from './ChiefRouter';
import ChiefPrivateRoute from '../routes/ChiefPrivateRoute';


const AppRouter = () => {
    const { theme } = useSelector(state => state.ui)

    return (
        <Wrapper theme={theme}>
            <Header />
            <Container>
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path='dashboard/*' element={(
                        <ChiefPrivateRoute>
                            <ChiefRouter />
                        </ChiefPrivateRoute>
                    )} />
                    <Route path='categories/:category/' element={<Category />} />
                    <Route path='prop/:rentalId/' element={<RentalSingle />} />
                </Routes>
            </Container>
        </Wrapper>
    )
}

export default AppRouter

const Wrapper = styled.div`
    min-height: 100vh;
    padding: 8px;
    transition: all 0.3s ease-in-out;
    background-color: rgb(22 22 25);
`

const Container = styled.main`
     min-height: calc(100vh - 118px);
    max-height: calc(100vh - 118px);
    /* width: 78%; */
    width: 100%;
    margin-bottom: 12px;
    margin-right: 12px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid rgb(38,39,42);
    background-color: rgb(27 28 31);
`
