import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import { trimText } from '../../functions'
import homeImage from "/images/home-1.jpg"
import dropdownIcon from "/icons/dropdown-light.svg"


const Category = () => {
	const { category } = useParams()
	const navigate = useNavigate()

	const [items, setItems] = useState([
		{
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
			area: 1800,
			image: "https://example.com/images/property1.jpg"
		},
		{
			id: "2",
			title: "Cozy Apartment in the Heart of the City",
			description: "A cozy apartment situated in a prime location with easy access to shops and restaurants.",
			type: "Apartment",
			address: "456 Elm St",
			city: "Sampletown",
			state: "Samplestate",
			zipcode: "54321",
			price: 1500,
			bedrooms: 2,
			bathrooms: 1,
			area: 1000,
			image: "https://example.com/images/property2.jpg"
		},
		{
			id: "3",
			title: "Luxurious Condo with Spectacular Views",
			description: "A luxurious condo offering breathtaking views of the city skyline and top-notch amenities.",
			type: "Condo",
			address: "789 Oak St",
			city: "Testville",
			state: "Teststate",
			zipcode: "98765",
			price: 350000,
			bedrooms: 4,
			bathrooms: 3,
			area: 2200,
			image: "https://example.com/images/property3.jpg"
		},
		{
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
			area: 1800,
			image: "https://example.com/images/property1.jpg"
		},
		{
			id: "2",
			title: "Cozy Apartment in the Heart of the City",
			description: "A cozy apartment situated in a prime location with easy access to shops and restaurants.",
			type: "Apartment",
			address: "456 Elm St",
			city: "Sampletown",
			state: "Samplestate",
			zipcode: "54321",
			price: 1500,
			bedrooms: 2,
			bathrooms: 1,
			area: 1000,
			image: "https://example.com/images/property2.jpg"
		},
		{
			id: "3",
			title: "Luxurious Condo with Spectacular Views",
			description: "A luxurious condo offering breathtaking views of the city skyline and top-notch amenities.",
			type: "Condo",
			address: "789 Oak St",
			city: "Testville",
			state: "Teststate",
			zipcode: "98765",
			price: 350000,
			bedrooms: 4,
			bathrooms: 3,
			area: 2200,
			image: "https://example.com/images/property3.jpg"
		},
		{
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
			area: 1800,
			image: "https://example.com/images/property1.jpg"
		},
		{
			id: "2",
			title: "Cozy Apartment in the Heart of the City",
			description: "A cozy apartment situated in a prime location with easy access to shops and restaurants.",
			type: "Apartment",
			address: "456 Elm St",
			city: "Sampletown",
			state: "Samplestate",
			zipcode: "54321",
			price: 1500,
			bedrooms: 2,
			bathrooms: 1,
			area: 1000,
			image: "https://example.com/images/property2.jpg"
		},
		{
			id: "3",
			title: "Luxurious Condo with Spectacular Views",
			description: "A luxurious condo offering breathtaking views of the city skyline and top-notch amenities.",
			type: "Condo",
			address: "789 Oak St",
			city: "Testville",
			state: "Teststate",
			zipcode: "98765",
			price: 350000,
			bedrooms: 4,
			bathrooms: 3,
			area: 2200,
			image: "https://example.com/images/property3.jpg"
		},
		{
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
			area: 1800,
			image: "https://example.com/images/property1.jpg"
		},
		{
			id: "2",
			title: "Cozy Apartment in the Heart of the City",
			description: "A cozy apartment situated in a prime location with easy access to shops and restaurants.",
			type: "Apartment",
			address: "456 Elm St",
			city: "Sampletown",
			state: "Samplestate",
			zipcode: "54321",
			price: 1500,
			bedrooms: 2,
			bathrooms: 1,
			area: 1000,
			image: "https://example.com/images/property2.jpg"
		},
		{
			id: "3",
			title: "Luxurious Condo with Spectacular Views",
			description: "A luxurious condo offering breathtaking views of the city skyline and top-notch amenities.",
			type: "Condo",
			address: "789 Oak St",
			city: "Testville",
			state: "Teststate",
			zipcode: "98765",
			price: 350000,
			bedrooms: 4,
			bathrooms: 3,
			area: 2200,
			image: "https://example.com/images/property3.jpg"
		},
	])

	return (
		<Container>
			<Head>
				<img
					src={dropdownIcon}
					alt="back button"
					onClick={e => navigate("/")}
				/>
				<h1>{category}</h1>
			</Head>
			<Items>
				{items.map(item => (
					<Item key={item.id} onClick={e => navigate(`/prop/${item.id}/`)}>
						<img src={homeImage} alt="" />
						<ItemDetails>
							<h1>{item.title}</h1>
							<p>{trimText(`${item.address}, ${item.description}`, 60)}</p>
						</ItemDetails>
					</Item>
				))}
			</Items>
		</Container>
	)
}

export default Category

const Container = styled.section`
	width: 990px;
	padding: 32px 0;
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

const Items = styled.section`
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