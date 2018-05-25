import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import CommonBox from "./Common.Box";

//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

class LinkAccounts extends Component {
  renderLinkForm() {
    return(
      <div className="col-sm-12">
        <div><button className="btn btn-success w-100">Link Microsoft Account</button></div>
        <br/>
        <div><button className="btn btn-primary w-100">Link Sony Account</button></div>
        <br/>
        <div><button className="btn btn-secondary w-100">Link Steam Account</button></div>
        <br/>
        <div><button className="btn btn-danger w-100">Link Nintendo Account</button></div>
        <br/>
        <div><button
          // onClick={this.props.FacebookLogin}
          className="btn btn-primary w-100">Link Facebook Account</button></div>
        <br/>
        <div><button
          // onClick={this.props.TwitterLogin}
          className="btn btn-success w-100">Link Twitter Account</button></div>
      </div>
    );
  }

  render() {
    const {currentUser, auth} = this.props;

    if (_.isEmpty(currentUser) || auth.error){
      return <Redirect to="/" />
    }

    return (
      <div>
        <CommonBox
          title="Link Game Accounts"
          body={this.renderLinkForm()}/>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  auth: state.auth,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(LinkAccounts);