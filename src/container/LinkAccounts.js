import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import SimpleBox from "../component/Form.Box";

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
      </div>
    );
  }

  renderLinkFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
    if(this.props.auth.loading) {
      return <h1>Loading...</h1>
    } else if (_.isEmpty(this.props.auth.currentUser) || this.props.auth.error){
      return <Redirect to="/" />
    }
    return (
      <div>
        <SimpleBox
          title="Link Game Accounts"
          body={this.renderLinkForm()}
          footer={this.renderLinkFooter()}/>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  auth: state.auth
});

export default connect(mapStateToProps)(LinkAccounts);