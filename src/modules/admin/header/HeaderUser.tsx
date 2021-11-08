import React, {useRef, useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import { RootState } from '@app/store';
import { logout } from '@app/store/slices/auth.slice';

function HeaderUser() {
    const user = useSelector((state:RootState) => state.auth.user)
    const dispatch = useDispatch();
    const dropdownRef = useRef<any>();
    const history = useHistory();

    const [dropdownState, updateDropdownState] = useState({
        isDropdownOpen: false
    });

    const toggleDropdown = () => {
        updateDropdownState({isDropdownOpen: !dropdownState.isDropdownOpen});
    };

    const handleClickOutside = (event:any) => {
        if (
            dropdownRef &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            updateDropdownState({isDropdownOpen: false});
        }
    };

    const logOut = (event:any) => {
        toggleDropdown();
        event.preventDefault();

        dispatch(logout());
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
                false
            );
        };
    });

    let className = 'dropdown-menu dropdown-menu-lg dropdown-menu-right rounded-lg';

    if (dropdownState.isDropdownOpen) {
        className += ' show';
    }
    return (
        <li ref={dropdownRef} className="nav-item dropdown user-menu">
            <a
                onClick={toggleDropdown}
                aria-hidden="true" 
                role="button" 
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
            >
                <img
                    src={(user && user.picture) || '/imgs/default-profile.png'}
                    className="user-image img-circle elevation-2"
                    alt="User"
                />
                {/* <span className="d-none d-md-inline">{email}</span> */}
            </a>
            <ul className={className}>
                <li className="user-header">
                    <img
                        src={(user && user.picture) || '/imgs/default-profile.png'}
                        className="img-circle elevation-2"
                        alt="User"
                    />
                    <p>
                        {user.name}
                        <small>{user.email}</small>
                    </p>
                </li>
                {/**
                <li className="user-body">
                    <div className="row">
                        <div className="col-4 text-center">
                            <Link to="/">{t('header.user.followers')}</Link>
                        </div>
                        <div className="col-4 text-center">
                            <Link to="/">{t('header.user.sales')}</Link>
                        </div>
                        <div className="col-4 text-center">
                            <Link to="/">{t('header.user.friends')}</Link>
                        </div>
                    </div>
                </li>
                */}
                <li className="user-footer border-top rounded-lg">
                    {/* <Link
                        to="/profile"
                        onClick={toggleDropdown}
                        className="btn btn-info btn-flat"
                    >
                        {t('header.user.profile')}
                    </Link> */}
                    <button
                        type="button"
                        className="btn btn-danger btn-flat float-right"
                        onClick={logOut}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </li>
    )
}

export default HeaderUser
