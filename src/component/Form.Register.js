import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import {Grid, Form, Button} from 'semantic-ui-react';

import {getAuth} from "../actions/action.auth";

import CommonInput from "./Common.Input";

import {registerEmailPassword} from '../actions/action.auth';

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
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Form size='large' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <Field
                label="Username"
                name="username"
                component={CommonInput}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Email"
                name="email"
                component={CommonInput}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Password"
                name="password"
                component={CommonInput}
                type="password" required
                onChange={this.handleChange}/>
              <Field
                label="Confirm Password"
                name="confirmPassword"
                component={CommonInput}
                type="password" required
                onChange={this.handleChange}/>
              <Button
                type="submit" disabled={this.props.pristine || this.props.submitting}>
                Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({

});

FormRegister = connect(mapStateToProps, {registerEmailPassword, getAuth})(FormRegister);

export default reduxForm({
  form: 'register',
})(FormRegister);