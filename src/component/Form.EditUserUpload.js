import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import CommonInput from "./Common.Input";

import {updateUserUpload} from '../actions/action.user';
import {updateUpload} from '../actions/action.upload';

class FormEditUserUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      caption: '',
      postId: '',
      type: ''
    };
  }
  componentWillMount () {
    const {caption, title, type} = this.props;
    this.setState({title, caption, type});
  }

  onSubmit(values) {
    // Add publisher, type, uploadId
    values.userId = this.props.publisher.id;
    values.type = this.state.type;
    values.uploadId = this.props.uploadId;

    console.log(values);

    this.props.updateUserUpload(values);
    this.props.updateUpload(values);
    this.props.dispatch(reset('editUserUpload'));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    const {caption, title} = this.props;
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-sm-offset-3 m-auto">
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))
              //this.props.onSubmit();
            }>
              <Field
                placeholder={title}
                name="editTitle"
                component={CommonInput}
                type="text"
                onChange={this.handleChange}/>
              <Field
                placeholder={caption}
                name="editCaption"
                component={CommonInput}
                type="textarea"
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
  currentUser: state.auth.currentUser,
  publisher: state.user.data.profile
});

FormEditUserUpload = connect(mapStateToProps,
  {updateUpload, updateUserUpload})(FormEditUserUpload);

export default reduxForm({
  form: 'editUserUpload'
})(FormEditUserUpload);