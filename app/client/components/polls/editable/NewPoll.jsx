C.NewPoll = React.createClass({
    mixins: [],
    getInitialState() {
        return {
            errors: {}
        }
    },
    onSubmit(event) {
        event.preventDefault();

        var pollName = event.target.pollname.value;
        var isPrivate = event.target.togglePrivatePoll.checked;

        var errors = {};

        if (!pollName) {
            errors.pollName = "Poll name required"
        }

        this.setState({
            errors: errors
        });

        if (! _.isEmpty(errors)) {
            return;
        }

        Polls.insert({ 
          name: pollName,
          userId: Meteor.userId(),
          votesTotal: 0,
          isPrivate: true,
          createdAt: new Date
        }, (err, _id) => {
            if (err) {
                this.setState({
                    errors: {'none': err.reason}
                });

                return;
            } else {
                FlowRouter.go('Poll', { _id: _id});
            }
        });
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <h1>New Poll</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.FormErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.email} name="PollName" type="text" label="Poll name" />
                            <div className="pull-left">
                                <C.Tooltipped position="bottom" text="Private/public poll">
                                  <span>
                                    <input type="checkbox" id="togglePrivatePoll" />
                                    <label htmlFor="togglePrivatePoll">Private</label>
                                  </span>
                                </C.Tooltipped>
                            </div>
                            <div className="pull-right">
                                <input type="submit" className="btn"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
