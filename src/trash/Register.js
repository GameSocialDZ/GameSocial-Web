import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import CommonBox from "./Common.Box";
import FormRegister from "../component/Form/Form.Register";
import FormLogin from "../component/Form/Form.Login";

import {getUser} from '../actions/action.user';

//import {Tab} from 'semantic-ui-react';

class Register extends Component {
  componentWillUnmount() {
    const {currentUser, getUser} = this.props;
    if(!_.isEmpty(currentUser)){
      getUser(currentUser.uid);
    }
  }

  render() {
    const {currentUser, auth} = this.props;

    if(auth.loading) {
      return <h1>Loading...</h1>
    } else if(!_.isEmpty(currentUser)) {
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
        <CommonBox
          title="Register"
          body={<FormRegister/>}/>
        <CommonBox
          title="Login"
          body={<FormLogin/>}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});


export default connect(mapStateToProps, {getUser})(Register);