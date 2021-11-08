import React, { useState } from 'react'
import {Route, Switch} from 'react-router-dom';
import AdminHeader from '@app/modules/admin/header/AdminHeader';
import AdminSidebar from '@app/modules/admin/sidebar/AdminSidebar';
import PageDashboard from '@app/pages/PageDashboard';
import PageProfile from '@app/pages/profile/PageProfile';
import PageBands from '@app/pages/bands';
import PageDetailBand from '@app/pages/bands/DetailBand';

const ModuleAdmin = () => {

    const [isMenuSidebarCollapsed, setIsMenuSidebarCollapsed] = useState(false);

    const toggleMenuSidebar = () => {
        setIsMenuSidebarCollapsed(!isMenuSidebarCollapsed);
    };

    return (
        <div
            className={`sidebar-mini layout-fixed ${
                isMenuSidebarCollapsed
                    ? 'sidebar-open'
                    : 'sidebar-collapse'
            }`}
            style={{height:'auto'}}
        >
            <div className="wrapper">
                <AdminHeader toggleMenuSidebar={toggleMenuSidebar} />
                <AdminSidebar />
                <div className="content-wrapper">
                    <div className="pt-1" />
                    <section className="content">
                        <Switch>
                            <Route exact path="/profile" component={PageProfile} />
                            <Route exact path="/" component={PageDashboard} />
                            <Route exact path="/bands" component={PageBands} />
                            <Route exact path="/bands/:id" component={PageDetailBand} />
                        </Switch>
                    </section>
                </div>
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={toggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </div>
        </div>
    )
}

export default ModuleAdmin
