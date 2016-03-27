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
    name: "PublicPolls",
    subscriptions(params) {
        this.register('polls', Meteor.subscribe('polls'));
    },
    action(params) {
        renderMainLayoutWith(<C.PublicPolls />);
    }
});

FlowRouter.route("/polls/new", {
    name: "NewPoll",
    action(params) {
        renderMainLayoutWith(<C.NewPoll />);
    }
});

FlowRouter.route("/:username", {
    name: "UserProfile",
    subscriptions(params) {
        this.register('user', Meteor.subscribe('userByUsername', params.username));
    },
    action(params) {
        renderMainLayoutWith(<C.UserProfilePage username={ params.username } />);
    }
});

FlowRouter.route("/:username/polls/", {
    name: "UserPolls",
    subscriptions(params) {
        this.register('polls', Meteor.subscribe('userPollsByUsername', params.username));
    },
    action(params) {
        renderMainLayoutWith(<C.PublicPolls userId={ params._id } />);
    }
});

FlowRouter.route("/polls/:_id", {
    name: "Poll",
    action(params) {
        renderMainLayoutWith(<C.PollViewPage pollId={ params._id } />);
    }
});

FlowRouter.route("/polls/:_id/edit", {
    name: "EditPoll",
    action(params) {
        renderMainLayoutWith(<C.EditablePollPage pollId={ params._id } />);
    }
});

FlowRouter.route("/polls/:_id/preview", {
    name: "PollPreview",
    action(params) {
        renderMainLayoutWith(<C.PollPage pollId={ params._id } preview={ true } />);
    }
});

FlowRouter.route("/polls/:pollId/:pollItemId/chart", {
    name: "Chart",
    subscriptions(params) {
        this.register('pollItems', Meteor.subscribe('pollItems', params.pollId));
        this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollItemId', params.pollItemId));
    },
    action(params, queryParams) {
        ReactLayout.render(C.ChartLayout, {
            content: <C.PollItemChartWrapper pollItemId={ params.pollItemId } params={ queryParams }/>
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