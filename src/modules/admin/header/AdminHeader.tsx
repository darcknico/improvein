import React from 'react'
import HeaderUser from './HeaderUser'

function AdminHeader({
    toggleMenuSidebar
}:any) {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a
                        onClick={() => {
                            if(typeof toggleMenuSidebar === 'function'){
                                toggleMenuSidebar();
                            }
                        }}
                        aria-hidden="true" 
                        className="nav-link"
                        role="button" 
                    >
                        <i className="fas fa-bars" />
                    </a>
                </li>
                {/**
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        {t('header.label.home')}
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        {t('header.label.contact')}
                    </Link>
                </li>
                */}
            </ul>
            {/**
            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <input
                        className="form-control form-control-navbar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search" />
                        </button>
                    </div>
                </div>
            </form>
            */}
            <ul className="navbar-nav ml-auto">
                {/**
                <Messages />
                <Notifications />
                <Languages />
                */}
                <HeaderUser />
                {/* <li className="nav-item">
                <button
                    className="nav-link"
                    data-widget="control-sidebar"
                    data-slide="true"
                    type="button"
                >
                    <i className="fas fa-th-large" />
                </button>
                </li>
                */}
            </ul>
        </nav>
    )
}

export default AdminHeader
