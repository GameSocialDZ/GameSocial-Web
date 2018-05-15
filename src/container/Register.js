import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import SimpleBox from "../component/SimpleBox";
import FormRegister from "../component/Form.Register";
import FormLogin from "../component/Form.Login";

import {getUserOnce} from "../actions/action.user";

//import {Tab} from 'semantic-ui-react';
//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

class Register extends Component {
  componentWillUnmount() {
    if(!_.isEmpty(this.props.auth.currentUser)){
      this.props.getUserOnce(this.props.auth.currentUser.uid);
    }
  }

  renderRegisterFooter() {
    return(
      <div>
        <div className="col-sm-6 m-auto">
          <button
            className="btn btn-primary w-100"
            // onClick={this.props.FacebookLogin}
          >Facebook</button>
        </div>
        <br/>
        <div className="col-sm-6 m-auto">
          <button
            className="btn btn-primary w-100"
            // onClick={this.props.TwitterLogin}
          >Twitter</button>
        </div>
      </div>
    );
  }

  render() {
    if(this.props.auth.loading && _.isEmpty(this.props.currentUser)) {
      return <h1>Loading...</h1>
    }
    else if(!_.isEmpty(this.props.auth.currentUser)) {
      return <Redirect to='/' />
    }

    // TODO: Implement Tab with semantic-ui-react
    // const panes = [
    //   { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    //   { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    // ];
    //
    // const TabExampleBasic = () => (
    //   <Tab panes={panes} />
    // );

    return (
      <div>
        <SimpleBox
          title="Register"
          body={<FormRegister/>}
          footer={this.renderRegisterFooter()}/>
        <SimpleBox
          title="Login"
          body={<FormLogin/>}
          footer={this.renderRegisterFooter()}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps,{getUserOnce/*, FacebookLogin, TwitterLogin*/})(Register);