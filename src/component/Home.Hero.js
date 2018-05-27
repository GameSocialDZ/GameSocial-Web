import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import HomeSlider from './Slider/Home.Slider';

//import { getFeaturedVideos } from '../actions/action.featured';

class HomeHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: {
        list: [
          {title: 1, id: 1},
          {title: 2, id: 2},
          {title: 3, id: 3}
        ]
      }
    }
  }

  // componentDidMount(){
  //   this.props.getFeaturedVideos();
  // }

  render() {
    // let hasFeatured = !!(this.props.featured && this.props.featured.list && this.props.featured.list.length > 0 );
    //let hasFeatured = !!(this.state.featured && this.state.featured.list && this.state.featured.list.length > 0 );
    return (
      <section id='hero'>
        <Container textAlign='center'>
          <HomeSlider
            featured={this.state.featured}/>
          {/*{hasFeatured && <Carousel featured={this.props.featured} />}*/}
        </Container>
      </section>
    )
  }
}

// const mapStateToProps = state => ({
//   featured: state.featuredVideos
// });

export default connect()(HomeHero);