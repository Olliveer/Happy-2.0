import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CreateOrphanage from '../pages/CreateOrphanage';

import Landing from '../pages/Landing';
import Signin from '../pages/Login/';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';
import { Recovery } from '../pages/Recovery';

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Redirect from="/dashboard" to="/" />
            {/* <Redirect from="/user/create" to="/" /> */}
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/login" component={Signin} />

            <Route path="/recovery" component={Recovery} />

            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanage/:id" component={Orphanage} />
        </Switch>
    </BrowserRouter>
);

export default AuthRoutes;
