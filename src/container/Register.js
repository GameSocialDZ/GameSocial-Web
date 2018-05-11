import React, {Component} from 'react';
import SimpleBox from "../component/SimpleBox";

export default class Register extends Component {

  renderRegisterForm() {
    return(
      <div className="col-sm-12">
        <div><button className="btn btn-success w-100">Login with Microsoft</button></div>
        {/*<br/>*/}
        {/*<div><button className="btn btn-primary w-100">Login with Playstation</button></div>*/}
        {/*<br/>*/}
        {/*<div><button className="btn btn-secondary w-100">Login with Steam</button></div>*/}
      </div>
    );
  }

  renderRegisterFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
    return (
      <div>
        <SimpleBox
          title="Register"
          body={this.renderRegisterForm()}
          footer={this.renderRegisterFooter()}/>
      </div>
    );
  }
}