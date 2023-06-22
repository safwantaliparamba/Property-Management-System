import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const { theme } = useSelector(state => state.ui)

    const navigate = useNavigate()

    const categories = useMemo(() => (
        [
            {
                id: nanoid(),
                title: "Residential",
            },
            {
                id: nanoid(),
                title: "Commercial",
            },
            {
                id: nanoid(),
                title: "Furnished",
            },
            {
                id: nanoid(),
                title: "Unfurnished",
            },
            {
                id: nanoid(),
                title: "Parking Spaces",
            },
            {
                id: nanoid(),
                title: "Storage Units",
            },
            {
                id: nanoid(),
                title: "Amenities and Facilities",
            },
            {
                id: nanoid(),
                title: "Event Spaces",
            },
            {
                id: nanoid(),
                title: "Agricultural and Rural Rentals",
            },
        ]
    ), [])

    function generateRandomColor() {
        // Generate random values for red, green, and blue channels in the higher range
        var red = Math.floor(Math.random() * 128) + 128;
        var green = Math.floor(Math.random() * 128) + 128;
        var blue = Math.floor(Math.random() * 128) + 128;
      
        // Construct the RGB color string
        var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
      
        return color
      }

    return (
        <>
            <Helmet>
                <title>Home | RentWise</title>
            </Helmet>
            <Wrapper theme={theme} >
                <Head >
                    <h1>Discover Your Dream Rental: Find the Perfect Home with our Trusted Rental Platform!</h1>
                    <p>Unlock Your Ideal Rental: Click, Explore, and Find the Perfect Home for Every Lifestyle!</p>
                </Head>
                <Categories className='wrapper'>
                    {
                        categories.map(category => (
                            <CategoryItem
                                key={category.id}
                                borderColor={generateRandomColor()}
                                onClick={e => navigate(`/categories/${category.title.toLowerCase()}/`)}
                            >
                                {category.title}
                            </CategoryItem>
                        ))
                    }
                </Categories>
            </Wrapper>
        </>
    )
}

export default Home

const Wrapper = styled.section`
    /* width: 990px;
    max-width: 90%;
    margin: 0 auto; */
`
const Head = styled.div`

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    margin-bottom: 42px;

    h1{
        font-size: 28px;
        max-width: 60%;
        text-align: center;
        color: #ffffffb2;
        margin-bottom: 18px;
    }
    p{
        font-size: 15px;
        text-align: center;
        color: #808080;
        max-width: 65%;
    }
`

const Categories = styled.div`
    display: flex;
    justify-content: center;
    gap: 22px;
    flex-wrap: wrap;
`
const CategoryItem = styled.div`
    padding: 12px 24px;
    color: #ffffffd0;
    border: 2px solid ${({borderColor}) => borderColor};
    /* background-color: #ff6bdc; */
    /* font-weight: 600; */
    border-radius: 8px;
    transition: all 0.4s ease-in-out;
    cursor: pointer;

    &:hover{
        background-color:${({borderColor}) => borderColor};
        color: #111;
    }
`