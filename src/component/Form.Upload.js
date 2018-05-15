import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import Input from "./Form.Input";
import Dropzone from './Form.Dropzone';

import {upload} from '../actions/action.upload';
import {getUser} from "../actions/action.user";

class FormUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      message: '',
      files:[],
      disabled: false,
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.uid);
  }

  onSubmit(values, file) {
    values.publisher = this.props.publisher;
    console.log(values);
    console.log(file);
    this.props.upload(values, file);
    this.props.dispatch(reset('upload'));
  }

  handleOnDrop = (files) => {
    this.setState({
      files,
      disabled: files.length === 1
    });
  };

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
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values, this.state.files[0]))}>
              <Field
                label="Title"
                name="title"
                component={Input}
                type="text" required
                onChange={this.handleChange}
              />
              <Field
                label="Caption"
                name="caption"
                component={Input}
                type="text" required
                onChange={this.handleChange}
              />
              <Field
                label="File"
                name="file"
                type="file"
                onChange={this.handleChange}
                component={() =>
                  <Dropzone
                    handleOnDrop={this.handleOnDrop.bind(this)}
                    disabled={this.state.disabled}
                    files={this.state.files}
                    name="avatar"/>
                  }
              />
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
  currentUser: state.auth.currentUser,
  publisher: state.user.data.profile
});

FormUpload = connect(mapStateToProps, {upload, getUser})(FormUpload);

export default reduxForm({
  form: 'upload',
})(FormUpload);