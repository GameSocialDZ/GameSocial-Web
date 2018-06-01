import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import store from './store';
import Home from "./container/Home";
import Profile from './container/Profile';
import View from './container/View';

import MenuHeader from './component/Menu/Menu.Header';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <MenuHeader/>
        <Switch>
          <Route path="/profile" component={Profile}/>
          <Route path="/view" component={View}/>
          <Route path="/" component={Home} exact={true}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
