import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home'

export default (
    <Switch>
        <Route exact path ='/home' component={Home}/>
        <Route exact path ='/' component={Login} />
    </Switch>
)