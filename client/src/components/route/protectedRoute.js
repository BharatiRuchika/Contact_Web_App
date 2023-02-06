import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    console.log("isAuthenticated", isAuthenticated)
    return (
        <>
            <Route {...rest} render={
                props => {
                    if (!isAuthenticated) {
                        console.log("im here");
                        return <Redirect to="/"></Redirect>
                    }
                    else {
                        return <Component {...props} />
                    }
                }
            }></Route>

        </>)
}

export default ProtectedRoute
