import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import {getAuth} from "../actions/action.auth";

import Input from "./Input";

import {registerEmailPassword} from '../actions/action.user';

class FormRegister extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit(values) {
    this.props.registerEmailPassword(values);
    this.props.dispatch(reset('register'));
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
                label="Username"
                name="username"
                component={Input}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Email"
                name="email"
                component={Input}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Password"
                name="password"
                component={Input}
                type="password" required
                onChange={this.handleChange}/>
              <Field
                label="Confirm Password"
                name="confirmPassword"
                component={Input}
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

FormRegister = connect(null, {registerEmailPassword, getAuth})(FormRegister);

export default reduxForm({
  form: 'register',
})(FormRegister);