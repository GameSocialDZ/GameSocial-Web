import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';
import axios from 'axios';
import _ from 'lodash';
import {CloudinaryConfig} from '../cloudinary';

import {Form, Button} from 'semantic-ui-react';

import CommonInput  from "./Common.Input";
import FormDropzone from './Form.Dropzone';

import {upload} from '../actions/action.upload';
import {getUser} from "../actions/action.user";

//TODO: Remove dubug
console.log(CloudinaryConfig);

class FormUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
      file:[],
      disabled: false,
      fileProgress: null,
      fileStatus: null,
      fileSelected: null,
      fileError: {
        status: false,
        msg: ''
      },
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.uid);
  }

  onSubmit(values, file) {
    if(_.isEmpty(file)){
      return alert('File not selected or still uploading!');
    }
    // Add publisher
    values.publisher = this.props.publisher;
    this.props.upload(values, file);
    this.props.dispatch(reset('upload'));
  }

  //TODO: file is uploaded to cloudinay on select.
  //TODO: Maybe move to on submit function and on select set state w/ file
  onFileSelect(file) { // = (e) => {
    const unsignedUploadPreset = CloudinaryConfig.cloud_name;
    const thisComponent = this;
    const fileSelected = file[0]; //e.target.files[0];

    //TODO: Remove dubug
    console.log(fileSelected);

    // Check video type
    const videoFileType = fileSelected.name.split('.').pop().toLowerCase();
    const hasVideoIndex = _.some(['mp4', 'webm', 'flv', 'mov', 'ogv', '3gp', '3g2', 'wmv', 'mpeg', 'flv', 'mkv', 'avi'], function (o) {
      return o === videoFileType;
    });

    // Check image type
    const imageFileType = fileSelected.name.split('.').pop().toLowerCase();
    const hasImageIndex = _.some(['gif', 'webp', 'bmp', 'flif', 'ico', 'jpg', 'jpe', 'jpeg', 'jpc', 'jp2', 'j2k', 'wdp', 'jxr', 'hdp', 'png', 'psd', 'tga', 'tif', 'tiff'], function (o) {
      return o === imageFileType;
    });

    // If correct file create form data and axios POST to cloudinary
    if (hasVideoIndex || hasImageIndex) {
      const data = new FormData();
      const timestamp = Date.now()/1000;

      data.append('file', fileSelected);
      data.append('upload_preset', unsignedUploadPreset);
      data.append('api_key', CloudinaryConfig.apiKey);
      data.append('timestamp', timestamp);

      let config = {
        // headers: { "X-Requested-With": "XMLHttpRequest" },
        onUploadProgress: function (progressEvent) {
          let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          thisComponent.setState({fileProgress: progress});
          if (progress === 100) {
            console.log('COMPLETE!');
            thisComponent.setState({fileStatus: 'Complete'});
          } else {
            thisComponent.setState({fileStatus: 'Uploading...'});
          }
        }
      };

      const url = hasImageIndex ? CloudinaryConfig.imageUrl: CloudinaryConfig.videoUrl;

      //TODO: Remove debug
      console.log(url);

      axios.post(url, data, config)
        .then(res => {
          //TODO: Remove dubug
          console.log(res);

          let fileError = {
            status: false,
            msg: ''
          };

          //let vidUrl = resUrl + res.data.public_id + "." + res.data.format;
          thisComponent.setState({
            videoError: fileError,
            fileSelected: res.data,
            fileUrl: res.data.secure_url
          });
        })
        .catch(error => {
          console.log(error);
          let videoError = {
            status: true,
            msg: error.message + ': File size is likely too big.'
          };
          thisComponent.setState({videoError: videoError});
        })
    } else {

      let videoError = {
        status: true,
        msg: 'Unsupported file type: ' + videoFileType === false ? imageFileType : videoFileType
      };
      thisComponent.setState({videoError: videoError});
    }
  };

  handleOnDrop = (files) =>{
    this.setState({
      files,
      disabled: files.length === 1
    });
    this.onFileSelect(files);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    return(
      <div>
        <Form onSubmit={this.props.handleSubmit(values => this.onSubmit(values, this.state.fileSelected))}>
          <Field
            label="Title"
            name="title"
            component={CommonInput}
            type="text" required
            onChange={this.handleChange}
          />
          <Field
            label="Caption"
            name="caption"
            component={CommonInput}
            type="text" required
            onChange={this.handleChange}
          />
          <FormDropzone
            fileLabel="File"
            fileType={''}
            handleOnDrop={this.handleOnDrop.bind(this)}
            disabled={this.state.disabled}
            file={this.state.file}
            directions="Drop or click to upload a video or image file."/>
          <Button
            type="submit" disabled={this.props.pristine || this.props.submitting}>
            Submit</Button>
        </Form>
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