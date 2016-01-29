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

FlowRouter.route("/polls/:_id", {
    name: "Poll",
    subscriptions(params) {
        return [Meteor.subscribe('poll', this.params._id)];
    },
    action(params) {
        renderMainLayoutWith(<C.Poll />);
    }
});

function renderMainLayoutWith(component) {
    ReactLayout.render(C.MainLayout, {
        header: <C.MainHeader />,
        content: component,
        footer: <C.MainFooter />
    });
}