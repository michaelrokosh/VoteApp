import React from 'react';

PollView = React.createClass({
  PropTypes: {
    pollId: React.PropTypes.string
  },


  render() {
    const { currentUser, poll, activePollItems, isReady } = this.data;
    let infoContainer;

    if (!isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);

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
                <C.PollItemView pollItem={ pollItem } />
              </div>
            )
          })
        }
      </div>
    );
  }
});
