import React from 'react'
import { keyframes, styled } from 'styled-components'
import BaseModal from './base/BaseModal'
import { Button } from '../home/Header'


const Delete = ({ onClose = () => { }, deleteHandler = () => { } }) => {
    return (
        <BaseModal onClick={onClose}>
            <Modal onClick={e => e.stopPropagation()}>
                <Content>
                    <h1>Delete</h1>
                    <p>Are you sure? you want to delete this rental property?</p>
                </Content>
                <Bottom>
                    <Button
                        className='delete'
                        onClick={e => deleteHandler()}
                    >
                        Delete
                    </Button>
                </Bottom>
            </Modal>
        </BaseModal>
    )
}

export default Delete

const popup = keyframes`
    0%{
        scale: 0.7;
        opacity: 0.7;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`

const Modal = styled.main`
    z-index: 12;
    width: 400px;
    border: 1px solid #fff;
    background-color: rgb(22 22 25);
    max-width: 96%;
    padding: 32px;
    border-radius: 12px;
    animation: ${popup} 0.4s ease-in-out;
`

const Content = styled.div`
    h1{
        color: #fff;
    }
    p{
        margin: 16px 0;
        font-size: 15px;
    }
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`