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
                            <input type="submit" className="btn"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
