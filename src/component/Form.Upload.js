import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';
import axios from 'axios';
import _ from 'lodash';
import {Input}  from 'semantic-ui-react';
import {CloudinaryConfig} from '../cloudinary';

import FormInput  from "./Form.Input";

import {upload} from '../actions/action.upload';
import {getUser} from "../actions/action.user";

//TODO: Remove dubug
console.log(CloudinaryConfig);

class FormUpload extends Component{
  constructor(props){
    super(props);
    this.state = {
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
      return alert('Must select a file!');
    }
    // Add publisher
    values.publisher = this.props.publisher;
    console.log(file);
    this.props.upload(values, file);
    this.props.dispatch(reset('upload'));
  }

  onFileSelect = (e) => {
    const unsignedUploadPreset = CloudinaryConfig.cloud_name;
    const thisComponent = this;
    const fileSelected = e.target.files[0];

    //TODO: Change video Selected var to fileSelected and check type to set
    //TODO: appropriate video or image upload url

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
            videoSelected: res.data,
            videoUrl: res.data.secure_url
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
        msg: 'Unsupported file type: ' + videoFileType === false ? imageFileType: videoFileType
      };
      thisComponent.setState({videoError: videoError});
    }
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
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values, this.state.videoSelected))}>
              <Field
                label="Title"
                name="title"
                component={FormInput}
                type="text" required
                onChange={this.handleChange}
              />
              <Field
                label="Caption"
                name="caption"
                component={FormInput}
                type="text" required
                onChange={this.handleChange}
              />
              <Input type="file" id="file" className='hidden' onChange={this.onFileSelect.bind(this)} />
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