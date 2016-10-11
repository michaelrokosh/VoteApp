import React from 'react';

import PollItemView from '../../containers/poll_view/poll_item_view.js';

class PollView extends React.Component {
  render() {
    const { isUser, poll, activePollItems, pollItemOptions } = this.props;

    let infoContainer;

    if (activePollItems.length === 0) {
      infoContainer = (
        <p>No active items...</p>
      )
    }

    return (
      <div className="poll-view">
        <h2 className="text-center">{ poll.name }</h2>
        { infoContainer }
        {
          activePollItems.map((pollItem, i) => {
            return (
              <div key={ i }>
                <PollItemView pollItem={ pollItem } />
              </div>
            )
          })
        }
      </div>
    );
  }
}

PollView.PropTypes = {
  pollId: React.PropTypes.string
}

export default PollView;