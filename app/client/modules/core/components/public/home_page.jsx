import React from 'react';

import DemoPollPage from '../../containers/demo_poll_page.js';

class HomePage extends React.Component {
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
                <DemoPollPage pollId="demoPoll" />
              </div>
            </div>
            <div className="col s12 m5 offset-m2">
             <DemoPollPage pollId="demoPoll" preview={ true } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;