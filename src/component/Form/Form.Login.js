import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import {Form, Grid, Button} from 'semantic-ui-react';

import CommonInput from "../Common/Common.Input";

import {loginEmailPassword} from '../../actions/action.auth';

class FormLogin extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

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
      <Grid className="container-fluid">
        <Grid.Row className="row">
          <Grid.Column className="col-sm-6 col-sm-offset-3 m-auto">
            <Form size='large' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <Field
                label="Email"
                name="loginEmail"
                component={CommonInput}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Password"
                name="loginPassword"
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
  currentUser: state.auth.currentUser
});


FormLogin = connect(mapStateToProps,
  {loginEmailPassword})(FormLogin);

export default reduxForm({
  form: 'login',
})(FormLogin);