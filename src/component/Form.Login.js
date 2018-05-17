import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';
//import _ from 'lodash';

import {getAuth} from "../actions/action.auth";
import {getUserOnce} from "../actions/action.user";

import FormInput from "./Form.Input";

import {loginEmailPassword} from '../actions/action.auth';

class FormLogin extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  // componentWillUnmount() {
  //   if(!_.isEmpty(this.props.auth.currentUser)){
  //     this.props.getUserOnce(this.props.auth.currentUser.uid);
  //   }
  // }

  onSubmit(values) {
    this.props.loginEmailPassword(values);
    this.props.dispatch(reset('login'));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 m-auto">
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <Field
                label="Email"
                name="loginEmail"
                component={FormInput}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Password"
                name="loginPassword"
                component={FormInput}
                type="password" required
                onChange={this.handleChange}/>
              <button
                className="btn btn-primary col-sm-12"
                type="submit" disabled={this.props.pristine || this.props.submitting}>
                Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


FormLogin = connect(mapStateToProps, {loginEmailPassword, getAuth, getUserOnce})(FormLogin);

export default reduxForm({
  form: 'login',
})(FormLogin);