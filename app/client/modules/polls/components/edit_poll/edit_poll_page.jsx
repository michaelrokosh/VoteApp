import React from 'react';

import EditPool from '../../containers/edit_poll.js';


class EditPollPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <EditPool pollId={ this.props.pollId } />
          </div>
        </div>
      </div>
    )
  }
}

EditPollPage.PropTypes = {
  pollId: React.PropTypes.string
}

export default EditPollPage;