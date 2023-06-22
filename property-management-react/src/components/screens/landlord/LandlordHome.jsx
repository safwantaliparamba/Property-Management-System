import React from 'react'
import { styled } from 'styled-components'



const LandlordHome = () => {

    return (
        <Wrapper>
            <h1>Landlord</h1>
        </Wrapper>
    )
}

export default LandlordHome


const Wrapper = styled.section`
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