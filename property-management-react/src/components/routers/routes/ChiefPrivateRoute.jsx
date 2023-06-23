import React from 'react'
import { useSelector } from 'react-redux'


const ChiefPrivateRoute = ({ children }) => {
    //calculate if user is authenticated or not
    const { isLandlord } = useSelector(state => state.auth)

    // if user is authenticated, return protected routes/page else return to login page with current url as next destination url
    return isLandlord ? children : <Navigate to="/" />
}

export default ChiefPrivateRoute