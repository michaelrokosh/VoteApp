FlowRouter.route("/", {
    name: 'Home',
    action(params) {
        renderMainLayoutWith(<C.Home />);
    }
});

FlowRouter.route("/sign-in", {
    name: "SignIn",
    action(params) {
        renderMainLayoutWith(<C.UserSignInPage />);
    }
});

FlowRouter.route("/sign-up", {
    name: "SignUp",
    action(params) {
        renderMainLayoutWith(<C.UserSignUpPage />);
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
    action(params) {
        renderMainLayoutWith(<C.PollPage pollId={ params._id }/>);
    }
});

FlowRouter.route("/polls/:_id/preview", {
    name: "PollPreview",
    action(params) {
        renderMainLayoutWith(<C.PollPage pollId={ params._id } preview={ true }/>);
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