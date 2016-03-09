C.PollItemView = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired,
    preview: React.PropTypes.boolean
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
    return {
      pollItemOptions: pollItemOptions
    }
  },

  render() {
    const { pollItem, preview } = this.props;
    const { pollItemOptions, isReady } = this.data; 

    return (
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        <p><Markdown>{ pollItem.description }</Markdown></p>
        <C.PollItemChartWrapper pollItemId={ pollItem._id }/>
        {
          pollItemOptions.map((option, i) => {
            return (
              <div key={ i }>
                <C.PollItemOptionView pollItemOption={ option } preview={ !!preview } />
              </div>
            )
          })
        }
      </div>
    );
  }
});
