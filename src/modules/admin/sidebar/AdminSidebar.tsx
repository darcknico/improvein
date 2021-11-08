import React from 'react'
import {NavLink, Link} from 'react-router-dom';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import SideBar from './SideBar';
import SideItem from './SideItem';

function AdminSidebar() {
    const user = useSelector((state:RootState) => state.auth.user);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt=""
                    className="brand-image mr-2 mr-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-normal ml-2">Adminlte</span>
            </Link>
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        autoHide: 'leave',
                        clickScrolling: true
                    },
                    className: 'os-theme-light',
                    sizeAutoCapable: true
                }}
                className="sidebar"
            >
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={
                                (user && user.picture) ||
                                '/imgs/default-profile.png'
                            }
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {user.name}
                        </Link>
                    </div>
                </div>
                <nav className="mt-2">
                    <SideBar>
                        <SideItem
                            icon={["fas", "tachometer-alt"]}
                            text="Bands"
                            to="/bands"
                        />
                    </SideBar>
                </nav>
            </OverlayScrollbarsComponent>
        </aside>
    )
}

export default AdminSidebar
