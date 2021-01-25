import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';


import Dashboard from '../pages/Dashboard';
import OrphanagesMap from '../pages/OrphanagesMap';
import Register from '../pages/Register';

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Redirect from="/login" to="/dashboard" />
            {/* <Redirect from="/app" to="/dashboard" /> */}
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/user/create" component={Register} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            {/* <Route path="/dashboard/delete/:id" component={DeleteOrphanage}/> */}
            {/* <Route path="/dashboard/pending" component={PendingOrphanage} /> */}
        </Switch>
    </BrowserRouter>
);

export default AppRoutes;