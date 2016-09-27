import React from 'react';

Home = React.createClass({
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1 className="text-center">VoteApp</h1>
            <p className="text-center">A reactive voting app that makes all the difference</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s12 m5">
              <div className="relative">
                <div className="fade"></div>
                <C.Poll pollId="demoPoll" />
              </div>
            </div>
            <div className="col s12 m5 offset-m2">
              <C.Poll pollId="demoPoll" preview={ true } />
            </div>
          </div>
        </div>
      </div>
    )
  }
});