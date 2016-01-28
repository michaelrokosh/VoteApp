FlowRouter.route("/", {
    name: 'Home',
    subscriptions(params) {

    },
    action(params) {
        renderMainLayoutWith(<C.Home />);
    }
});

FlowRouter.route("/sign-in", {
    name: "SignIn",
    subscriptions(params) {

    },
    action(params) {
        renderMainLayoutWith(<C.UserSignIn />);
    }
});

FlowRouter.route("/sign-up", {
    name: "SignUp",
    subscriptions(params) {

    },
    action(params) {
        renderMainLayoutWith(<C.UserSignUp />);
    }
});

function renderMainLayoutWith(component) {
    ReactLayout.render(C.MainLayout, {
        header: <C.MainHeader />,
        content: component,
        footer: <C.MainFooter />
    });
}