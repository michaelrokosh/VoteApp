C.PollItemOption = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object,
    index: React.PropTypes.number
  },

  updateText(e) {
    const updatedText = e.target.value;

    Meteor.call('PollItemOptions/updateText', this.props.pollItemOption._id, updatedText);
    return;
  },

  removePollItem(e) {
    e.preventDefault();

    Meteor.call('PollItemOptions/removeById', this.props.pollItem._id);
    return;
  },

  removePollItemOption(e) {
    e.preventDefault();

    Meteor.call('PollItemOptions/removeById', this.props.pollItemOption._id);
    return;
  },

  render() {
    const { pollItemOption, index } = this.props;

    return (
      <div className="poll-item-option">
        <C.FormInput name={ index.toString() } type="text" className="poll-item-option" placeholder="Option label" label={ index.toString() } onChange={ this.updateText } value={ pollItemOption.text }/>
        <C.Tooltipped position="bottom" text="Remove this option">
          <i className="remove-poll-item-option material-icons dp48" onClick={ this.removePollItemOption }>delete</i>
        </C.Tooltipped>
      </div>
    );
  }
});
