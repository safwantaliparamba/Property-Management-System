import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'


const Logo = ({ fontSize = 22, color = null, nav = "/" }) => {
    const theme = useSelector(state => state.ui.theme)
    const { isLandlord } = useSelector(state => state.auth)
    const navigate = useNavigate()

    return (
        <Head
            fontSize={fontSize}
            theme={theme}
            color={color}
            className={color ? "color" : ""}
            onClick={() => navigate(isLandlord ? "/dashboard" : nav)}
        >
            <span>Rent</span>Wise
        </Head>
    )
}

export default Logo

const Head = styled.h1`
    font-size: ${({ fontSize }) => `${fontSize}px`};
    color: ${({ theme }) => theme === "DARK" ? "#fff" : "#111"};
    cursor: pointer;
    user-select:none;

    span{
        font-size:inherit;
        font-weight: 600;
        color:inherit;
    }

    &.color{
        color:${({ color }) => color}
    }
`