C.PollItemOption = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object
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

  render() {
    const { pollItemOption } = this.props;

    return (
      <div className="poll-item-option">
        <C.FormInput name={ pollItemOption.rank.toString() } type="text" className="poll-item-option" placeholder="Option label" label={ pollItemOption.rank.toString() } onBlur={ this.updateText } value={ pollItemOption.text }/>
      </div>
    );
  }
});
