import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Player } from 'video-react';
import Slider from 'react-slick';
import _ from 'lodash';
import { Container, Image, Segment } from 'semantic-ui-react';
//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

class HomeSlider extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    const hasList = !!(this.props.featured.data);
    return hasList ? (
      <Slider {...settings}>
        {
          _.map(this.props.featured.data, feature => {
            return(
              <Segment key={feature.id}>
                <div className="slideContent">
                  <Player
                    className="embed-responsive-item"
                    loop
                    playsinline
                    aspectRatio="16:9"
                    poster={feature.thumbnail.large}
                    src={feature.url}/>
                  <h1>{feature.content.title}</h1>
                </div>
                <div className="slideInner">
                  <Container text textAlign='center'>
                    {/*<Link>To Video View</Link>*/}
                    {/*<Link>To user Profile</Link>*/}
                  </Container>
                </div>
              </Segment>
            )
          })

        }
      </Slider>
    ):(<div>Loading...</div>)
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  featured: state.featured
});

export default connect(mapStateToProps)(HomeSlider);