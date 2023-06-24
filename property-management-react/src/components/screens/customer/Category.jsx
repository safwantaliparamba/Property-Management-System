import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import { trimText } from '../../functions'
import homeImage from "/images/home-1.jpg"
import dropdownIcon from "/icons/dropdown-light.svg"
import { authApi } from '../../../config/axios'
import Loader from '../../includes/loaders/Loader'


const Category = () => {
	const { category } = useParams()
	const navigate = useNavigate()

	const [items, setItems] = useState([])
	const [isLoading, setLoading] = useState(false)

	const fetchRentals = () => {
		setLoading(true)

		authApi
			.get("/rentals/rental_properties/")
			.then(({ data: { statusCode, data } }) => {

				if (statusCode === 6000) {
					setItems(data.data)
				} else {
					console.log(data.message);
				}

				setLoading(false)
			})
			.catch((error) => {
				console.log(error);
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchRentals()
	}, [])

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
				{isLoading ? (
					<LoaderWrapper>
						<Loader />
					</LoaderWrapper>
				) :
					items.map(item => (
						<Item key={item.id} onClick={e => navigate(`/prop/${item.id}/`)}>
							<img src={homeImage} alt="" />
							<ItemDetails>
								<h1>{item.title}</h1>
								<p>{trimText(`${item.address}, ${item.description}`, 60)}</p>
							</ItemDetails>
						</Item>
					))

				}
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

export const LoaderWrapper = styled.div`
	width: 100%;
	min-height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
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
	width: 100%;
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