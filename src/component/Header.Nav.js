import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {signOut } from "../actions/action.auth";

class HeaderNav extends Component {
  render() {
    const {currentUser, signOut} = this.props;
    return (
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Logo</Link>
          <button type="button" className="navbar-toggler bg-dark" data-toggle="collapse" data-target="#HeadNav">
            <span className="navbar-toggler-icon"/>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="HeadNav">
          {
            _.isEmpty(currentUser) ? (
              <ul className="navbar-nav navbar-right">
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </ul>
            ):(
              <ul className="navbar-nav navbar-right">
                <li className="nav-item">
                  <Link className="nav-link" to="/register"
                    onClick={() => signOut()}>SignOut</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
              </ul>
            )
          }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, {signOut})(HeaderNav);