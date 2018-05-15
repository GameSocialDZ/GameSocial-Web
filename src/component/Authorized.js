import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Authorized extends Component {
  componentDidMount() {
    // Make sure the loading is done then if no user
    // push them to login page
    const {loading, currentUser} = this.props;
    if(loading === false && _.isEmpty(currentUser)){
      this.props.history.push('/register');
    }
  }

  render() {
    const {children, currentUser, loading} = this.props;
    return (loading === false && currentUser) ? <div>{children}</div> : null;
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    loading: state.auth.loading
  }
};

export default withRouter(connect(mapStateToProps)(Authorized));