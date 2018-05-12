import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import Input from "./Input";

import {upload} from '../actions/action.upload';

class FormUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      message: ''
    };
  }

  onSubmit(values) {
    this.props.upload(values);
    this.props.dispatch(reset('upload'));
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
                label="Title"
                name="title"
                component={Input}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Caption"
                name="caption"
                component={Input}
                type="text" required
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

FormUpload = connect(null, {upload})(FormUpload);

export default reduxForm({
  form: 'upload',
})(FormUpload);