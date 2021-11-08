import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import { RootState } from '@app/store';

const PrivateRoute = ({
    children, ...rest
}:any) => {
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)

    return (
        <Route
            {...rest}
            render={({location}:any) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
