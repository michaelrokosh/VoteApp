import React from 'react';

PollItemView = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired,
    preview: React.PropTypes.boolean
  },

  // mixins: [ReactMeteorData],

  // getMeteorData() {
  //   const pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
  //   return {
  //     pollItemOptions: pollItemOptions
  //   }
  // },

  render() {
    const { pollItem, preview } = this.props;
    const { pollItemOptions, isReady } = this.data; 

    return (
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        <Markdown>{ pollItem.description || "" }</Markdown>
        <C.PollItemChartWrapper pollItemId={ pollItem._id }/>
        {
          pollItemOptions.map((option, i) => {
            return (
              <div key={ i }>
                <C.PollItemOptionView pollItemOption={ option } preview={ !!preview } index={ i } />
              </div>
            )
          })
        }
      </div>
    );
  }
});
