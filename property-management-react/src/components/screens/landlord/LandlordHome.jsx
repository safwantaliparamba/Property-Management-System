import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { useDispatch } from 'react-redux'
import useClickOutside from 'react-use-click-outside-hook'

import { Button } from '../../includes/home/Header'
import CreateProperties from '../../includes/modals/CreateProperties'


const LandlordHome = () => {
    // const dispatch = useDispatch()

    const [showActions, setActions] = useState(false)
    const [showCreateProp, setCreate] = useState(false)

    const closeActionModal = () => setActions(false)

    const ActionModal = () => {
        const modalRef = useClickOutside(closeActionModal, "action-parent")

        return (
            <ModalWrapper
                ref={modalRef}
                onClick={e => e.stopPropagation()}
            >
                <ModalItem onClick={e => {
                    setCreate(true)
                    closeActionModal()
                }}>
                    <span>Create</span>
                </ModalItem>
                <ModalItem>
                    <span>Edit</span>
                </ModalItem>
                <ModalItem className='logout'>
                    <span>Delete</span>
                </ModalItem>
            </ModalWrapper>
        )
    }

    return (
        <Wrapper>
            {showCreateProp && (
                <CreateProperties
                    onClose={() => setCreate(false)}
                />
            )}
            <Actions>
                <Left>
                    <h1>Manage Properties/Rental</h1>
                </Left>
                <Right>
                    <Button className='reserve' id="action-parent" onClick={e => setActions(!showActions)}>
                        Actions
                        {showActions && <ActionModal />}
                    </Button>
                </Right>
            </Actions>
            
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