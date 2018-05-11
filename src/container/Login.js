import React, {Component} from 'react';
import SimpleBox from "../component/SimpleBox";

export default class Login extends Component {
  renderLoginForm(){
    return(
      <div className="col-sm-12">

      </div>
    );
  }

  renderLoginFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
    return (
      <div>
        <SimpleBox
          title="Login"
          body={this.renderLoginForm()}
          footer={this.renderLoginFooter}/>
      </div>
    );
  }
}