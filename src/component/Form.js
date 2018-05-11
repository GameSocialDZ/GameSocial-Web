import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import Input from "./Input";

import {postPost} from '../actions/postActions';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      message: ''
    };
  }

  onSubmit(values) {
    this.props.postPost(values);
    this.props.dispatch(reset('posts'));
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
              <label htmlFor="name">Full Name
                <Field
                  name="name"
                  component={Input}
                  type="text" required
                  onChange={this.handleChange}/>
              </label>
              <label htmlFor="message">Message
                <Field
                  name="message"
                  component={Input}
                  type="text" required
                  onChange={this.handleChange}/>
              </label>
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

Form = connect(null, {postPost})(Form);

export default reduxForm({
  form: 'posts',
})(Form);