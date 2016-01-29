C.PollItem = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      pollItemOptions: PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch(),
      pollItem: PollItems.findOne({ _id: this.props.pollItem._id })
    }
  },

  getInitialState() {
    return {
      errors: {},
      active: this.props.pollItem.active
    }
  },

  updateText(e) { 
    let updatedText = e.target.value;
    PollItems.update({ _id: this.props.pollItem._id }, { $set: { text: updatedText } });
  },

  removePollItem(e) {
    e.preventDefault();

    PollItems.remove({ _id: this.props.pollItem._id });
    return;
  },

  toggleActive(e) {
    Meteor.call('pollItems/toggleActive', this.props.pollItem._id, !this.props.pollItem.active); 
  },

  render() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data;

    return (
      <div className="poll-item">
        <form onSubmit={ this.updatePollItem }>
          <C.FormErrors errors={ this.state.errors } />
          <C.FormInput hasError={ !!this.state.errors.question } onBlur={ this.updateText } name="Question" type="text" label="Question" value={ pollItem.text }/>
          {
            pollItemOptions.map((option, i) => {
              return <C.PollItemOption pollItemOption={ option }/>
            })
          }
          <div className="text-right">
            <div className="switch pull-left">
              <label>
                Off
                <input type="checkbox" onChange={ this.toggleActive } checked={ this.props.pollItem.active }/>
                <span className="lever"></span>
                On
              </label>
            </div>
            <input type="button" className="btn red" onClick={ this.removePollItem } value="Remove"/>
          </div>
        </form>
      </div>
    );
  }
});
