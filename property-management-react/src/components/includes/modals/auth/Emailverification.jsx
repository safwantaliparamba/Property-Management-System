import React from 'react'
import { keyframes, styled } from 'styled-components'

import BaseModal from '../base/BaseModal'
import emailIcon from '/icons/email.svg'


const Emailverification = ({ email = "test@rentwise.com", closeHandler = () => { } }) => {
    return (
        <BaseModal>
            <Modal>
                <Top>
                    <img src={emailIcon} alt="" />
                </Top>
                <Content>
                    <h1>Verify your email</h1>
                    <p>Almost there! we sent a verification to <span className="email">{email}</span>.
                        You need to verify your email address to log in to <span>RentWise</span>.</p>
                </Content>
                <Actions>
                    <Button
                        className='close'
                        onClick={closeHandler}
                    >
                        OK
                    </Button>
                </Actions>
            </Modal>
        </BaseModal>
    )
}

export default Emailverification


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
    width: 580px;
    max-width: 96%;
    background: #fff;
    padding: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: ${popup} 0.4s ease-in-out;
`
const Top = styled.div`
    img{
        width: 42px;
    }
`
const Content = styled.div`
    text-align: center;
    margin: 26px 0;
    
    h1{
        font-size: 22px;
        font-weight: 600;
        color: #004c64;
        margin-bottom: 16px;
    }
    p{
        font-size: 15px;
        max-width: 90%;

        span:not(span.email){
            font-size: inherit;
            font-weight: 600;
            color: #004c64;
        }
        span.email{
            font-size: inherit;
            font-style: italic;
        }
    }
`
const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
`

export const Button = styled.button`
    padding: 9px 28px;
    border: 1px solid #004c64;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    color: #004c64;

    &.close{
        color: #fff;
        background-color: #004c64 ;

    }
`