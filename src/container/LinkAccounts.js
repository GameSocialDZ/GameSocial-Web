import React, {Component} from 'react';
import SimpleBox from "../component/SimpleBox";

export default class LinkAccounts extends Component {

  renderLinkForm() {
    return(
      <div className="col-sm-12">
        <div><button className="btn btn-success w-100">Link Microsoft Account</button></div>
        <br/>
        <div><button className="btn btn-primary w-100">Link Sony Account</button></div>
        <br/>
        <div><button className="btn btn-secondary w-100">Link Steam Account</button></div>
        <br/>
        <div><button className="btn btn-danger w-100">Link Nintendo Account</button></div>
      </div>
    );
  }

  renderLinkFooter() {
    return(
      <div>

      </div>
    );
  }

  render() {
    return (
      <div>
        <SimpleBox
          title="Link Game Accounts"
          body={this.renderLinkForm()}
          footer={this.renderLinkFooter()}/>
      </div>
    );
  }
}