import React, {Component} from 'react';

export default class SimpleBox extends Component {
  render() {
    return(
      <div className="container">
        <div className="d-flex justify-content-center align-self-center">
          <div className="col-sm-12 jumbotron">
            <div className="card-block text-center">
              <div className="card-title">
                <h1>{this.props.title}</h1>
              </div>
              <div className="card-body">
                {this.props.body}
              </div>
              <div className="card-footer">
                {this.props.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
