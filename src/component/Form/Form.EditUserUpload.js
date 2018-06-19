import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

import CommonInput from "../Common/Common.Input";

import {updateUserUpload} from '../../actions/action.user';
import {updateUpload} from '../../actions/action.upload';

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

  onSubmit(auth, values) {
    values.type = this.state.type;
    values.uploadId = this.props.uploadId;

    // Update 1
    this.props.updateUserUpload(auth, values);
    // Update 2
    this.props.updateUpload(values);

    this.props.dispatch(reset('editUserUpload'));
    this.props.onSubmit();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    const {caption, title, auth} = this.props;
    return(
      <div >
        <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
          <Button
            color='teal' fluid size='large'
            type="submit" disabled={this.props.pristine || this.props.submitting}>
            Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  publisher: state.user.data.profile
});

FormEditUserUpload = connect(mapStateToProps,
  {updateUpload, updateUserUpload})(FormEditUserUpload);

export default reduxForm({
  form: 'editUserUpload'
})(FormEditUserUpload);