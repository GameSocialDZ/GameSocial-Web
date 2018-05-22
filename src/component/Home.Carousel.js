import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import _ from 'lodash';
import { Container, Grid, Segment, Button, Header, Item, Image, Icon } from 'semantic-ui-react';
//import {FacebookLogin, TwitterLogin} from '../actions/action.user';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

class HomeCarousel extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    const hasList = !!(this.props.featured.list);
    return hasList ? (
      <Slider {...settings}>
        {
          _.map(this.props.featured.list, feature => {
            return(
              <div >
                <div className="slideContent">
                  <h1>{feature.title}</h1>
                </div>
                <div className="slideInner">
                  <Container text textAlign='center'>
                    {/*<Link>To Video View</Link>*/}
                    {/*<Link>To user Profile</Link>*/}
                  </Container>
                </div>
              </div>
            )
          })

        }
      </Slider>
  ):(<div>Loading...</div>)
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HomeCarousel);