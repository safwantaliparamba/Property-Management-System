import { useMemo, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { styled } from "styled-components"
import { nanoid } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import useClickOutside from "react-use-click-outside-hook"

import { sliceNumber, isPathnameEqual } from "../../functions"

const LeftSideBar = ({ }) => {
    // global states //
    const { theme } = useSelector(state => state.ui)
    // Local states

    // Hooks //
    const navigate = useNavigate()

    return (
        <Container theme={theme}>
            <TopWrapper>
                <Nav>
                    <NavItem
                        className={isPathnameEqual('/dashboard') ? "active" : ""}
                        theme={theme}
                        onClick={e => navigate("/dashboard")}
                    >
                        <div className="wrapper">
                            <span>Properties</span>
                        </div>
                    </NavItem>
                    <NavItem
                        className={isPathnameEqual('/dashboard/applications') ? "active" : ""}
                        theme={theme}
                        onClick={e => navigate("applications")}
                    >
                        <div className="wrapper">
                            <span>Applications</span>
                        </div>
                    </NavItem>
                    {/* <NavItem
                        className={isPathnameEqual('/dashboard/settings') ? "active" : ""}
                        theme={theme}
                        onClick={e => navigate("settings")}
                    >
                        <div className="wrapper">
                            <span>Settings</span>
                        </div>
                    </NavItem> */}
                </Nav>
            </TopWrapper>
        </Container>
    )
}

export default LeftSideBar

const Container = styled.div`
    width: 18%;
    height: calc(100vh - 24px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    /* border: 1px solid #222222; */
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.4s ease-in-out;
    padding: 28px 0;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#00b90214"};
    /* background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#a0a0a045"}; */
`

const Head = styled.header`
    padding: 28px 26px;
    padding-top: 0;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1;
`

const Profile = styled.div`
    display: flex;
    z-index: 5;
    align-items: center;
    justify-content: space-between;
    padding: 12px 26px ;
    gap: 4px;
    user-select: none;
    margin-bottom: 24px;
    position: relative;

    .wrapper{
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px;
        cursor: pointer;
        border: 1px solid transparent;

        /* &:hover{
            border-radius: 6px;
            border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
        } */
        
        img.profile{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }

        span{
            font-size: 16px;
            /* font-weight: 600; */
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    div.dropdown-wrapper{
        width: 35px;
        height: 35px;
        /* padding: 12px; */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover{
            background: #8080801a;
            border: 1px solid ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
            border-radius: 20%;
            transition: border 0.3s ease-in-out;
        }
        img.dropdown{
            width: 14px ;
            display: inline-block;
        }

    }
`

const NavItem = styled.div`
    padding: 12px 0 ;
    margin: 0 26px;
    padding: 12px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    gap: 18px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;

    &:hover, 
    &.active{
        background:  ${({ theme }) => theme === "DARK" ? "#8080801a" : "#fff"};
        border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
    }


    &>.wrapper{
        margin: 0;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        gap: 18px;

        .left{
            img{
                width: 18px;
            }
        }
        span{
            font-size: 15px;
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    span.count{
        font-size: 14px;
        // color: red;
        font-weight: 600;
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
    }

    &.active{
        span{
            font-weight: 600;
        }
    }
    &.golden-btn{
        span{
            color: rgb(120,50,5);
        }

        &:hover{
            background-size: 150% 150%;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),
                        inset 0 -2px 5px 1px #b17d10,
                        inset 0 -1px 1px 3px rgba(250,227,133,1);
            border: 1px solid rgba(165,93,7,.6);
            background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
        }
    }
    &.logout{
        span{
            color: red;
            font-size: 14px;
            font-weight: 600;
        }
    }
`
const TopWrapper = styled.div`
    
`

const BottomWrapper = styled(Nav)`
    
`

///////////  Accounts Modal ////////////

const ModalWrapper = styled.div`
    position: absolute;
    width: 94%;
    border-radius: 18px;
    top: 60px;
    left: 3%;
    padding: 12px;
    background: rgb(27 28 31);
    border: 1px solid #d9d7d7;
    /* border-radius: 20%; */
    /* transition: border 0.3s ease-in-out; */
    z-index: 10;
`

const ModalItem = styled(Profile)`
    padding: 0;
    margin: 0;
    margin-bottom: 1px;
    z-index: 10;
    /* background-color: inhe; */

    .wrapper{
        margin: 0 ;
        /* padding: 0; */
        span{
            font-size: 14px;
            flex: 1;
        }
    }

    &:last-child{
        margin-bottom: 0;
    }
`

const AddNew = styled(ModalItem)`
    .wrapper .img-wrapper{
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 50%;

        img{
            width: 15px;
        }
    }
`