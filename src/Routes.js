
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './Components/loadFilmes/loadfilmes';
import Films from './Components/filmes/filmes';
import Login from './Components/login/login';
import Erro from './Components/Error/error.js'

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />   
                <Route exact path="/Home" component={Main} />   
                <Route exact path="/Filme/:id" component={Films} /> 
                <Route path="*" component={Erro} />         
            </Switch>
        </Router>
    );
};
    export default Routes;