import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import useClickOutside from 'react-use-click-outside-hook'

import { trimText } from '../../functions'
import homeImage from "/images/home-1.jpg"
import { authApi } from '../../../config/axios'
import Loader from '../../includes/loaders/Loader'
import { Button } from '../../includes/home/Header'
import CreateProperties from '../../includes/modals/CreateProperties'
import Delete from '../../includes/modals/Delete'
import EditProperties from '../../includes/modals/EditProperties'


const LandlordHome = () => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const [showActions, setActions] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [showCreateProp, setCreate] = useState(false)
    const [items, setItems] = useState([])
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [showContextModal, setContext] = useState(false)
    const [showDelete, setDelete] = useState(false)
    const [selectedItem, setSelected] = useState("")
    const [showEdit, setEdit] = useState(false)

    const fetchRentals = () => {
        setLoading(true)

        authApi
            .get("/rentals/rental_properties/me/")
            .then(({ data: { statusCode, data } }) => {

                if (statusCode === 6000) {
                    setItems(data.data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchRentals()
    }, [])

    const onContextChange = (e) => {
        e.preventDefault();
        const modal = document?.getElementById("context-modal")

        if (e.pageX + modal.clientWidth > window.innerWidth) {
            setLeft(e.clientX - modal.clientWidth)
        } else {
            setLeft(e.clientX)
        }

        if (e.pageY + modal.clientHeight > window.innerHeight) {
            setTop(e.clientY - modal.clientHeight)
        } else {
            setTop(e.clientY)
        }
    }

    const closeCreateModal = () => {
        setCreate(false)
        fetchRentals()
    }

    const CloseContextModal = () => {
        setContext(false)
    }

    const closeDeleteHandler = () => {
        setDelete(false)
    }

    const propertyDeleteHandler = () => {
        authApi
            .post(`/rentals/rental_properties/delete/${selectedItem}/`)
            .then(({ data: { statusCode, data } }) => {

                if (statusCode === 6000) {
                    closeDeleteHandler()
                    fetchRentals()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const closeEditModal = () => {
        setEdit(false)
        fetchRentals()
    }

    const ContextModal = () => {
        const modalRef = useClickOutside(CloseContextModal)

        return (
            <ContextModalWrapper
                className={showContextModal ? "active" : ""}
                ref={modalRef}
                id="context-modal"
                top={top}
                left={left}
            >
                <ContextItem
                    onClick={e => {
                        setEdit(!showEdit)
                        CloseContextModal()
                    }}
                >
                    <span>Edit</span>
                </ContextItem>
                <ContextItem
                    onClick={e => {
                        setDelete(!showDelete)
                        CloseContextModal()
                    }}
                >
                    <span className="delete">Delete</span>
                </ContextItem>
            </ContextModalWrapper >
        )
    }

    return (
        <Wrapper>
            <ContextModal />
            {showCreateProp && (
                <CreateProperties
                    onClose={closeCreateModal}
                />
            )}
            {showDelete && (
                <Delete
                    onClose={closeDeleteHandler}
                    deleteHandler={propertyDeleteHandler}
                />
            )}
            {showEdit && (
                <EditProperties
                    id={selectedItem}
                    onClose={closeEditModal}
                />
            )}
            <Actions>
                <Left>
                    <h1>Manage Properties/Rental</h1>
                </Left>
                <Right>
                    <Button
                        className='reserve'
                        onClick={e => setCreate(true)}
                    >
                        Create
                    </Button>
                </Right>
            </Actions>
            {isLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <Items>
                    {items?.map(item => (
                        <Item
                            key={item.id}
                            onContextMenu={e => {
                                setContext(true)
                                setSelected(item.id)
                                onContextChange(e)
                            }}
                        // onClick={e => navigate(`/prop/${item.id}/`)}
                        >
                            <img src={homeImage} alt="" />
                            <ItemDetails>
                                <h1>{item.title}</h1>
                                <p>{trimText(`${item.address}, ${item.description}`, 60)}</p>
                            </ItemDetails>
                        </Item>
                    ))}
                </Items>
            )}
        </Wrapper>
    )
}

export default LandlordHome


const Wrapper = styled.section`

`
const Actions = styled.header`
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    h1{
        font-size: 26px;
        color: #d7d7d7;
    }
`
const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const ModalWrapper = styled.div`
    overflow: hidden;
    width: 200px;
    border-radius: 8px;
    position: absolute;
    top: 38px;
    left: -115px;
    border: 1px solid #fff;
    background-color: rgb(22 22 25);
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
const Content = styled.div`
 
`
const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Items = styled.section`
    width: 85%;
    margin: 0 auto;
    display: flex;
    /* align-items: center; */
    flex-wrap: wrap;
	gap: calc(4% / 3);
`
const Item = styled.div`
	margin-bottom: 16px;
    width: 32%;
	position: relative;
    display: flex;
	cursor: pointer;
    flex-direction: column;
	border: 1px solid #ffffffae;
	border-radius: 12px;
	overflow: hidden;

    img{
        display: block;
        width: 100%;
		filter: brightness(0.5);
    }
`
const ItemDetails = styled.div`
    /* position: absolute; */
	/* border: 1px solid #ffffffae; */
	z-index: 10;
	width: 100%;
	height: 100%;
	margin-top: -28px;
    padding: 8px;
	background: #f1f1f1;
	/* background-color: rgb(22 22 25); */
	border-radius: 12px;

	h1{
		max-width: 85%;
		margin: 6px auto;
		font-size: 16px;
		color: #111;
		font-weight: 600;
		text-align: center;
	}
	p{
		max-width: 85%;
		margin: 0 auto;
		font-size: 14px;
		color: #292929;
	}
`
const ContextModalWrapper = styled.div`
    /* display: none; */
    visibility: none;
    pointer-events: none;
    border: 1px solid #fff;
    background-color: rgb(22 22 25);
    opacity: 0;
    user-select: none;
    position: absolute;
    z-index: 15;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    width: 200px;
    overflow:hidden;
    border-radius: 12px;

    &.active{
        pointer-events:auto;
        visibility:visible;
        user-select:auto;
        opacity:1;
    }
`

const ContextItem = styled.div`
    width: 100%;
    cursor: pointer;

    span{
        padding: 6px 12px;
        font-size: 16px;
        display: block;
        width: 100%;
        color: #fff;

        &.delete{
            color: red;
        }
    }

    &:hover{
        background-color: #80808018;
    }
`