import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import dropdownIcon from "/icons/dropdown-light.svg"


const RentalSingle = () => {
    const { rentalId } = useParams()
    const navigate = useNavigate()

    const [property, setProperty] = useState({
        id: "1",
        title: "Spacious Family Home",
        description: "A beautiful and spacious family home located in a peaceful neighborhood.",
        type: "House",
        address: "123 Main St",
        city: "Exampleville",
        state: "Examplestate",
        zipcode: "12345",
        price: 250000,
        bedrooms: 3,
        bathrooms: 2,
        category: "Residential",
        area: 1800,
        image: "https://example.com/images/property1.jpg"
    },)

    return (
        <Wrapper className="wrapper">
            <Head>
                <img
                    src={dropdownIcon}
                    alt="back button"
                    onClick={e => navigate(`/categories/${property.category.toLowerCase()}/`)}
                />
                <h1>{property.title}</h1>
            </Head>
        </Wrapper>
    )
}

export default RentalSingle


const Wrapper = styled.section`
	padding: 32px 0;
    width: 990px;
	max-width: 90%;
	margin: 0 auto;
`
const Head = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	/* justify-content: center; */
	/* flex-direction: column; */
	margin-bottom: 58px;

	img{
		width: 40px;
		rotate: 90deg;
		cursor: pointer;
		padding: 16px 8px;
		border-radius: 6px;
		border: 1px solid #808080;
	}
	h1{
		margin-left: 32px;
		color: #ffffffb2;
		font-size: 28px;
		max-width: 70%;
		text-transform: capitalize;
	}
	p{
		max-width: 70%;
		font-size: 15px;
		color: #808080;
	}
`