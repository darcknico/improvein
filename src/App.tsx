import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import PublicRoute from '@app/routes/PublicRoute';
import PrivateRoute from '@app/routes/PrivateRoute';
import Login from '@app/modules/auth/ModuleLogin';
import Admin from '@app/modules/admin/ModuleAdmin';
import './App.scss';

function App() {
    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login">
                    <Login />
                </PublicRoute>
                <PrivateRoute path="/">
                    <Admin />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
