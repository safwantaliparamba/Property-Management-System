import React, { useEffect, useMemo, useState } from 'react'
import { keyframes, styled } from 'styled-components'
import BaseModal from './base/BaseModal'
import { nanoid } from '@reduxjs/toolkit'
import { Button } from '../home/Header'
import { authApi } from '../../../config/axios'


const EditProperties = ({ onClose = () => { }, id = "" }) => {
    const [inputs, setInputs] = useState({
        title: "",
        address: "",
        city: "",
        description: "",
        category: "",
        rent: "",
        booking_charge: "",
    })
    const [errorMessage, setError] = useState(false)

    const inputData = useMemo(() => (
        [
            {
                id: nanoid(),
                title: "Title",
                slug: "title",
            },
            {
                id: nanoid(),
                title: "Address",
                slug: "address",
            },
            {
                id: nanoid(),
                title: "City",
                slug: "city",
            },
            {
                id: nanoid(),
                title: "Description",
                slug: "description",
            },
            {
                id: nanoid(),
                title: "Category",
                slug: "category",
            },
            {
                id: nanoid(),
                title: "Rent",
                slug: "rent",
            },
            {
                id: nanoid(),
                title: "Booking Charge",
                slug: "booking_charge",
            },
        ]
    ), [])

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    }, [errorMessage])

    const fetchData = () => {
        authApi
            .get(`/rentals/rental_properties/me/${id}/`)
            .then(({ data: { statusCode, data } }) => {

                if (statusCode === 6000) {
                    setInputs({ ...data.data })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const updateHandler = () => {

        authApi
            .post(`/rentals/rental_properties/edit/${id}/`, { ...inputs })
            .then(({ data: { statusCode, data } }) => {

                if (statusCode === 6000) {
                    onClose()
                } else {
                    setError(data.message)
                }
            })
    }

    return (
        <BaseModal onClick={onClose}>
            <Modal onClick={e => e.stopPropagation()}>
                <Head>
                    <h1>Edit Property/Rental</h1>
                </Head>
                <Form>
                    <InputWrapper>
                        {inputData.map(input => (
                            <InputContainer key={input.id}>
                                <label htmlFor={input.slug}>{input.title}</label>
                                <input
                                    type="text"
                                    id={input.slug}
                                    placeholder={input.title}
                                    name={input.slug}
                                    onChange={onInputChange}
                                    value={inputs[input.slug]}
                                />
                            </InputContainer>
                        ))}
                    </InputWrapper>
                    {errorMessage && (
                        <ErrorContainer>
                            <p>{errorMessage}</p>
                        </ErrorContainer>
                    )}
                    <Bottom>
                        <Button
                            className='reserve'
                            onClick={updateHandler}
                        >
                            Submit
                        </Button>
                    </Bottom>
                </Form>
            </Modal>
        </BaseModal>
    )
}

export default EditProperties

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
    width: 800px;
    height: 500px;
    border: 1px solid #fff;
    background-color: rgb(22 22 25);
    max-width: 96%;
    padding: 32px;
    border-radius: 12px;
    animation: ${popup} 0.4s ease-in-out;
`

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    padding-top: 0;

    h1{
        font-size: 22px;
        color: #fff;
    }
`
const Form = styled.div`
`
const InputWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`
const InputContainer = styled.div`
    width: 48%;
    margin: 0 auto;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;

    &:last-child{
        margin: 0;
        margin-left: 1%;
    }

    label{
        color: #d2d2d2;
        font-size: 15px;
        margin-bottom: 8px;
    }
    input,.input{
        padding: 8px 16px;
        color: #c2c2c2;
        border-radius: 8px;
        border: 1px solid #fff;

        &::placeholder{
            color: #c2c2c2;
        }
    }
`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 32px 0;

    button{
        width: 50%;
    }
`

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    p{
        font-size: 15px;
        color: red;
    }
`