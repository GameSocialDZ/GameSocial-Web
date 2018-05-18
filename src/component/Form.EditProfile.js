import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import CommonInput from "./Common.Input";
import FormDropzone from '../component/Form.Dropzone';

class FormEditProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      editName: '',
      editBio: '',
      files: [],
      disabled: false
    };
  }

  handleOnDrop = (files)=>{
    this.setState({
      files,
      disabled: files.length === 1
    });
  };

  onSubmit(values) {
    //TODO: Add dispatch
    this.props.dispatch(reset('editProfile'));
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
                label="Edit Name"
                name="editName"
                component={CommonInput}
                type="text"
                onChange={this.handleChange}/>
              <Field
                label="Edit Bio"
                name="editBio"
                component={CommonInput}
                type="textarea"
                onChange={this.handleChange}/>
              <FormDropzone
                fileLabel="Avatar"
                fileType="image/*"
                handleOnDrop={this.handleOnDrop.bind(this)}
                disabled={this.state.disabled}
                file={this.state.files}
                directions="Drop or click to upload an avatar for your profile picture."/>
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

});

FormEditProfile = connect(mapStateToProps)(FormEditProfile);

export default reduxForm({
  form: 'editProfile',
})(FormEditProfile);