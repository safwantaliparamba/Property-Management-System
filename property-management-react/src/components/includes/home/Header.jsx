import React, { useEffect, useState } from 'react'

import { styled } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import useClickOutside from 'react-use-click-outside-hook'

import Logo from '../Logo'
import profile from "/images/profile-demo.jpg"
import searchDark from "/icons/search-dark.svg"
import searchLight from "/icons/search-light.svg"
import { logout } from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'


const Header = () => {
    const { theme } = useSelector(state => state.ui)
    const { isLandlord, name } = useSelector(state => state.auth)
    
    const navigate = useNavigate()

    const [isActive, setActive] = useState(false)
    const [searchInput, setSearch] = useState("")
    const [showProfile, setProfile] = useState(false)

    useEffect(() => {
        const searchInput = document.getElementById("search-input")
        const handleKeyDown = (event) => {
            if (event.key === "/" && document.activeElement !== searchInput) {
                event.preventDefault()
                setActive(true)
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // functions
    const SearchHandler = () => {
        console.log("Search handler triggered");
    }

    const onSearchChange = (e) => setSearch(e.target.value)

    const closeSearchBar = () => setActive(false)
    const closeProfileModal = () => setProfile(false)

    const modalRef = useClickOutside(closeSearchBar)

    const ProfileModal = () => {
        const dispatch = useDispatch()
        const modalRef = useClickOutside(closeProfileModal, "profile-parent")
        const logoutHandler = () => {
            dispatch(logout())
        }

        return (
            <ProfileModalWrapper
                ref={modalRef}
                theme={theme}
                onClick={e => e.stopPropagation()}
            >
                <ModalItem><span>{name}</span></ModalItem>
                <ModalItem><span>Settings</span></ModalItem>
                <ModalItem
                    className="logout"
                    onClick={logoutHandler}
                >
                    <span>Logout</span>
                </ModalItem>
            </ProfileModalWrapper>
        )
    }

    return (
        <Container theme={theme}>
            <Left theme={theme}>
                <Logo navToHome />
                <SearchBar
                    theme={"DARK"}
                    className={isActive ? "active" : ""}
                    id="search-input"
                    ref={modalRef}
                >
                    {isActive ? (
                        <input
                            type="text"
                            tabIndex={0}
                            autoFocus
                            onChange={onSearchChange}
                            value={searchInput}
                            placeholder='Search rentals'
                        />
                    ) : (
                        <span
                            onClick={e => setActive(!isActive)}
                        >
                            Enter <kbd>/</kbd> to search
                        </span>
                    )}
                    <button onClick={SearchHandler}>
                        <img
                            src={searchLight}
                            alt="search"
                        />
                    </button>
                </SearchBar>
            </Left>
            <Right>
                {isLandlord ? (
                    <Button onClick={e => navigate("/")}>
                        Home page
                    </Button>
                ) : (
                    <Button>Become a Landlord</Button>
                )}
                <Profile onClick={e => setProfile(!showProfile)} id="profile-parent">
                    <img src={profile} alt="profile" />

                    {showProfile && (
                        <ProfileModal />
                    )}
                </Profile>
            </Right>
        </Container>
    )
}

export default Header


const Container = styled.header`
    /* width: 100%; */
    margin-bottom: 8px;
    padding: 19px 32px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#00b90214"};

    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    gap: 32px;
`
const SearchBar = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    /* justify-content: space-between; */
    /* gap: 24px; */
    width: 50%;
    padding: 10px 18px;
    border-radius: 15px;
    transition: all 0.4s ease-in-out;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "#D9D9D9" : "#222"};

    &.active{
        width: 70%;
    }
    
    input,span{
        width: calc(100% - 42px);
        /* width: 80%; */
        font-size: 14px;
        letter-spacing: 1.2px;
        flex: 1;
        color: ${({ theme }) => theme === "DARK" ? "#EAEAEA" : "#222222"};
        
        &::placeholder{
            color: ${({ theme }) => theme === "DARK" ? "#EAEAEA" : "#222222"};
        }
    }

    span{
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;

        kbd{
            display: inline-grid;
            width: 12px;
            height: 16px;
            padding: 0;
            font-size: 12px;
            line-height: 1.3333333333;
            color: inherit;
            vertical-align: baseline;
            background: transparent;
            border: 1px solid #808080;
            border-radius: 3px;
            box-shadow: none;
            align-items: center;
            justify-content: center;
        }
    }

    button{
        padding: 0 8px;
        cursor: pointer;

        img{
            width: 20px;
        }
    }
`

const Right = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 28px;
`

const Profile = styled.div`
    position: relative;
    cursor: pointer;

    img{
        width: 40px;
        border-radius: 50%;
    }
    
`

export const Button = styled.button`
    padding: 8px 18px;
    color :#808080 ;
    border: 1px solid #808080;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.7s ease-in-out;

    &#action-parent{
        position: relative;
    }
    &.reserve{
        color: #00a2ff;
        border-color: #00a2ff;

        &:hover{
            color: #212121;
            background-color: #00a2ff;
        }
    }
    &.delete{
        color: red;
        border-color: red;

        &:hover{
            color: #212121;
            background-color: red;
        }
    }

    &:hover{
        background-color: #808080;
        color: rgb(27 28 31);
    }
`

const ProfileModalWrapper = styled.div`
    z-index: 10;
    overflow: hidden;
    width: 200px;
    border-radius: 8px;
    position: absolute;
    top: 45px;
    left: -142px;
    border: 1px solid #fff;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
    /* border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"}; */
`

const ModalItem = styled.div`
    &:hover{
        background-color: #80808080;
        span{
            color: #fff;
        }
    }
    span{
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
        color: #808080;
    }
    &.logout{
        span{
            color: red;
        }
        &:hover{
            background-color: red;
            span{
                color: #fff;
            }
        }
    }
`