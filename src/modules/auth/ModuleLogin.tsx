import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {connect, useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { RootState } from '@app/store';
import { login } from '@app/store/slices/auth.slice';
import { User } from '@app/models/auth';

const schema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required(),
    password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required()
});

function LoginScreen() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

    const history = useHistory();


    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: 'test@test.com',
            password: '123456',
        }
    });

    const onSubmit = (values:User) => {
        dispatch(login(values));
    }

    useEffect(() => {
        if(isAuthenticated){
            history.push('/bands');
        }
        return () => {
            
        }
    }, [isAuthenticated])

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/">
                        <b>Admin</b>LTE
                    </Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                                {errors.email ? (
                                    <div className="default-invalid-feedback">
                                        {errors.email?.message}
                                    </div>
                                ) : null}
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                                {errors.password ? (
                                    <div className="default-invalid-feedback">
                                        {errors.password?.message}
                                    </div>
                                ) : null}
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember"/>
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>

                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <Link to="/" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </Link>
                            <Link to="/" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </Link>
                        </div>

                        <p className="mb-1">
                            <Link to="/forgot-password">
                                I forgot my password
                            </Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">
                                Register a new membership
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
};


export default LoginScreen;
