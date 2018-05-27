import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import _ from 'lodash';

import { Container, Image, Grid, Card } from 'semantic-ui-react';

//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  lazyLoad: true,
};

class ContentSlider extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    let responsive = [
      {
        breakpoint: 8000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
        // settings: 'unslick'
      }
    ];

    const {content} = this.props;

    const hasList = !_.isEmpty(content);
    return hasList ? (
      <Slider {...settings} responsive={responsive}>
        {this.props.content}
      </Slider>
    ):(<div>Loading...</div>)
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(ContentSlider);