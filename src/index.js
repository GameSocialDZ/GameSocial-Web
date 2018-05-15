import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './main.css';

import store from './store';
import Home from "./container/Home";
import Register from "./container/Register";
import LinkAccounts from "./container/LinkAccounts";
import Upload from "./container/Upload";
import Profile from './container/Profile';

import HeaderNav from './component/Header.Nav';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <HeaderNav />
        <Switch>
          <Route path="/link" component={LinkAccounts}/>
          <Route path="/upload" component={Upload} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile}/>
          <Route path="/" component={Home} exact={true}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
