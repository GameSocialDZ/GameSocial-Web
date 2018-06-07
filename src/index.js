import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, browserHistory} from 'react-router-dom';

import store from './store';
import Home from "./container/Home";
import Profile from './container/Profile';
import View from './container/View';

import MenuHeader from './component/Menu/Menu.Header';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/' history={browserHistory}>
      <div>
        <MenuHeader/>
        <Switch>
          <Route exact path="/profile/:userId" component={Profile}/>
          <Route exact path="/view" component={View}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
