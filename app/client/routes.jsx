FlowRouter.route("/", {
    name: 'Home',
    action(params) {
        renderMainLayoutWith(<C.Home />);
    }
});

FlowRouter.route("/sign-in", {
    name: "SignIn",
    action(params) {
        renderMainLayoutWith(<C.UserSignIn />);
    }
});

FlowRouter.route("/sign-up", {
    name: "SignUp",
    action(params) {
        renderMainLayoutWith(<C.UserSignUp />);
    }
});

FlowRouter.route("/polls", {
    name: "LatestPolls",
    subscriptions(params) {
        this.register('polls', Meteor.subscribe('polls'));
    },
    action(params) {
        renderMainLayoutWith(<C.LatestPolls />);
    }
});

FlowRouter.route("/polls/new", {
    name: "NewPoll",
    action(params) {
        renderMainLayoutWith(<C.NewPoll />);
    }
});

FlowRouter.route("/polls/:_id", {
    name: "Poll",
    subscriptions(params) {
        this.register('poll', Meteor.subscribe('poll', params._id));
        this.register('pollItems', Meteor.subscribe('pollItems', params._id));
        this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollId', params._id));
    },
    action(params) {
        renderMainLayoutWith(<C.Poll />);
    }
});

FlowRouter.route("/polls/:_id/preview", {
    name: "PollPreview",
    subscriptions(params) {
        this.register('poll', Meteor.subscribe('poll', params._id));
        this.register('pollItems', Meteor.subscribe('pollItems', params._id));
        this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollId', params._id));
    },
    action(params) {
        renderMainLayoutWith(<C.Poll preview={ true }/>);
    }
});

FlowRouter.route("/polls/:pollId/:pollItemId/chart", {
    name: "Chart",
    subscriptions(params) {
        this.register('pollItems', Meteor.subscribe('pollItems', params.pollId));
        this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollItemId', params.pollItemId));
    },
    action(params) {
        ReactLayout.render(C.MainLayout, {
            content: <C.PollItemChartWrapper pollItemId={ params.pollItemId } showToOwnerOnly={ true }/>
        });
    }
});

function renderMainLayoutWith(component) {
    ReactLayout.render(C.MainLayout, {
        header: <C.MainHeader />,
        content: component,
        footer: <C.MainFooter />
    });
}