import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {database} from "../../firebase";

import {addFeatured, removeFeatured, getFeaturedOnce} from '../../actions/action.featured'

export class FeaturedToggle extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    this.setFeatured();
  }

  onToggle = (e, {checked}) => {
    console.log('toggle success');
    const {upload} = this.props;
    return database.ref(`featured`).orderByChild('id').equalTo(upload.id)
      .once('value', data => {
        const exist = !!data.val();

        if(exist){
          this.props.removeFeatured(upload.id);
          this.setState({isFeatured: false})
        } else {
          this.props.addFeatured(upload);
          this.setState({isFeatured: true})
        }
        this.props.getFeaturedOnce();
      })
  };

  setFeatured = () => {
    const {upload} = this.props;
    return database.ref(`featured`).orderByChild('id').equalTo(upload.id)
      .once('value', data => {
        this.setState({isFeatured: !!data.val()});
      })
  };


  render(){
    const {isFeatured} = this.state;
    const {featured} = this.props;

    return (
      <Checkbox
        toggle
        checked={isFeatured}
        onClick={this.onToggle}/>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps,
  {addFeatured, removeFeatured, getFeaturedOnce})
(FeaturedToggle)