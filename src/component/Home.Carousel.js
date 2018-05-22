import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import _ from 'lodash';

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderContent(featuredList) {
    return _.map(featuredList, item => {
      return (
        <div>
          <img src="https://res.cloudinary.com/diygdnbei/image/upload/v1519444005/zumnvvbqi0fo1zthkal7.png" />
          <p className="legend">{item.title}</p>
        </div>
      );
    })
  }

  render() {
    const {featured} = this.props;
    return (
      <Carousel showArrows={true}>
                {/*onChange={onChange}> onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
        {this.renderContent(featured)}
      </Carousel>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HomeCarousel);