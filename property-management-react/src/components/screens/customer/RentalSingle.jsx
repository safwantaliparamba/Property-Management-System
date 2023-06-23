import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import dropdownIcon from "/icons/dropdown-light.svg"
import HomeImage from "/images/home-1.jpg"
import { Button } from '../../includes/home/Header'


const RentalSingle = () => {
    const { rentalId } = useParams()
    const navigate = useNavigate()

    const [isReserved, setResrve] = useState(false)
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

    const navigateToCategory = () => navigate(`/categories/${property.category.toLowerCase()}/`)

    return (
        <Wrapper className="wrapper">
            <Head>
                <img
                    src={dropdownIcon}
                    alt="back button"
                    onClick={navigateToCategory}
                />
            </Head>
            <Content>
                <Left>
                    <img src={HomeImage} alt="" />
                </Left>
                <Right>
                    <Title>
                        <h1>{property.title}</h1>
                        <p>{`${property.address}, ${property.description}`}</p>
                    </Title>
                    <Category onClick={navigateToCategory}>{property.category}</Category>
                    
                    <Details>
                        <span>Rent - <span className="price">{property.price.toLocaleString()}</span>/m</span>
                        <span className='info bottom'>Pay registration fee and reserve</span>
                        <Button className={isReserved ? "" : 'reserve'}>
                            {isReserved ? "Reserved" : "Reserve Now"}
                        </Button>
                    </Details>
                </Right>
            </Content>
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
	margin-bottom: 38px;
	/* justify-content: center; */
	/* flex-direction: column; */

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
const Title = styled.div`
    margin-bottom: 32px;

    h1{
        font-size: 24px;
        color: #fff;
        margin-bottom: 14px;
    }
    p{
        font-size: 15px;
        color: #808080;
    }
`

const Content = styled.section`
    display: flex;
`

const Left = styled.div`
    width: 50%;

    img{
        border-radius: 8px;
    }
`

const Right = styled.div`
    width: 50%;
    padding: 0 22px;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    span{
        font-size: 17px;
        color: #d9d9d9;
        &.bottom{
            margin-bottom: 48px;
        }
        &.info{
            font-size: 14px;
            color: #808080;
        }
        span.price{
            color: #53ff9e;
        }
    }
`
const Category = styled.span`
    padding: 7px 14px;
    color: #d9d9d9;
    display: inline-block;
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 7px;
`