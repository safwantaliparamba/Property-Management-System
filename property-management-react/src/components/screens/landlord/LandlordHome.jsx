import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useClickOutside from 'react-use-click-outside-hook'

import { trimText } from '../../functions'
import homeImage from "/images/home-1.jpg"
import { Button } from '../../includes/home/Header'
import CreateProperties from '../../includes/modals/CreateProperties'
import { authApi } from '../../../config/axios'
import Loader from '../../includes/loaders/Loader'


const LandlordHome = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [showActions, setActions] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [showCreateProp, setCreate] = useState(false)
    const [items, setItems] = useState([])

    const fetchRentals = ()=>{
        setLoading(true)

        authApi
            .get("/rentals/rental_properties/me/")
            .then(({ data: { statusCode, data } }) => {
                console.log(statusCode);

                if (statusCode === 6000) {
                    setItems(data.data)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchRentals()
    }, [])

    // const closeActionModal = () => setActions(false)

    // const ActionModal = () => {
    //     const modalRef = useClickOutside(closeActionModal, "action-parent")

    //     return (
    //         <ModalWrapper
    //             ref={modalRef}
    //             onClick={e => e.stopPropagation()}
    //         >
    //             <ModalItem onClick={e => {
    //                 setCreate(true)
    //                 closeActionModal()
    //             }}>
    //                 <span>Create</span>
    //             </ModalItem>
    //             <ModalItem>
    //                 <span>Edit</span>
    //             </ModalItem>
    //             <ModalItem className='logout'>
    //                 <span>Delete</span>
    //             </ModalItem>
    //         </ModalWrapper>
    //     )
    // }

    const closeCreateModal = ()=>{
        setCreate(false)
        fetchRentals()
    }

    return (
        <Wrapper>
            {showCreateProp && (
                <CreateProperties
                    onClose={closeCreateModal}
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
    width: 80%;
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