import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getAuth, signOut } from "../actions/action.auth";

class HeaderNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          {/*<div className="navbar-header">*/}
          <Link className="navbar-brand" to="/">Logo</Link>
          <button type="button" className="navbar-toggler bg-dark" data-toggle="collapse" data-target="#HeadNav">
            <span className="navbar-toggler-icon"/>
          </button>
          {/*</div>*/}
        </div>
        <div className="collapse navbar-collapse" id="HeadNav">
          {
            _.isEmpty(this.props.auth) ? (
              <ul className="navbar-nav navbar-right">
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </ul>
            ):(
              <ul className="navbar-nav navbar-right">
                <li className="nav-item">
                  <Link className="nav-link" to="/signout"
                    onClick={() => this.props.sighOut()}>SignOut</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/link">Link</Link></li>
              </ul>
            )
          }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.data
});

export default connect(mapStateToProps, {getAuth, signOut})(HeaderNav);