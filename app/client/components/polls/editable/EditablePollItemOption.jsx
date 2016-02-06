C.PollItemOption = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object,
    index: React.PropTypes.number
  },

  updateText(e) {
    let updatedText = e.target.value;
    PollItemOptions.update({ _id: this.props.pollItemOption._id }, { $set: { text: updatedText } });
  },

  removePollItem(e) {
    e.preventDefault();

    PollItems.remove({ _id: this.props.pollItem._id });
    return;
  },

  removePollItemOption(e) {
    e.preventDefault();

    PollItemOptions.remove({ _id: this.props.pollItemOption._id });
    return;
  },

  render() {
    const { pollItemOption, index } = this.props;

    return (
      <div className="poll-item-option">
        <C.FormInput name={ index.toString() } type="text" className="poll-item-option" placeholder="Option label" label={ index.toString() } onChange={ this.updateText } value={ pollItemOption.text }/>
        <i className="remove-poll-item-option material-icons dp48" onClick={ this.removePollItemOption }>delete</i>
      </div>
    );
  }
});
