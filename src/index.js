import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import store from './store';
import Login from './container/Login';
import Home from "./container/Home";
import Upload from "./container/Upload";
import Register from "./container/Register";

//TODO: Add a mixin to hide toggle btn when less than 768px
const HeadNav = () => (
  <nav className="navbar navbar-expand-sm bg-light">
    <div className="container-fluid">
      {/*<div className="navbar-header">*/}
        <Link className="navbar-brand" to="/">Logo</Link>
        <button type="button" className="navbar-toggler bg-dark" data-toggle="collapse" data-target="#HeadNav">
          <span className="navbar-toggler-icon"></span>
        </button>
      {/*</div>*/}
    </div>
    <div className="collapse navbar-collapse" id="HeadNav">
      <ul className="navbar-nav navbar-right">
        <li className="nav-item"><Link className="nav-link" to="/Register">Register</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Upload">Upload</Link></li>
      </ul>
    </div>
  </nav>
);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <HeadNav />
          <Switch>
            <Route path="/Register" component={Register}/>
            <Route path="/Login" component={Login} />
            <Route path="/Upload" component={Upload} />
            <Route path="/" component={Home} exact={true}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
