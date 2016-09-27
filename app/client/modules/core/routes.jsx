import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/layouts/main_layout.jsx';
import UserSignInPage from '../auth/components/user_sign_in/user_sign_in_page.jsx';
import UserSignUpPage from '../auth/components/user_sign_up/user_sign_up_page.jsx';

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route("/", {
        name: 'Home',
        action() {
            mount(MainLayoutCtx , {
                content: <h1>Hi!</h1>
            })
        }
    });

    FlowRouter.route("/sign_in", {
        name: "SignIn",
        action() {
            mount(MainLayoutCtx, {
                content: <UserSignInPage />
            });
        }
    });

    FlowRouter.route("/sign_up", {
        name: "SignUp",
        action() {
            mount(MainLayoutCtx, {
              content: <UserSignUpPage />
            });
        }
    });

    // FlowRouter.route("/polls", {
    //     name: "PublicPolls",
    //     subscriptions(params) {
    //         this.register('polls', Meteor.subscribe('polls'));
    //     },
    //     action(params) {
    //         mount(<C.PublicPolls />);
    //     }
    // });

    // FlowRouter.route("/polls/new", {
    //     name: "NewPoll",
    //     action(params) {
    //         mount(<C.NewPoll />);
    //     }
    // });

    // FlowRouter.route("/:username", {
    //     name: "UserProfile",
    //     subscriptions(params) {
    //         this.register('user', Meteor.subscribe('userByUsername', params.username));
    //     },
    //     action(params) {
    //         mount(<C.UserProfilePage username={ params.username } />);
    //     }
    // });

    // FlowRouter.route("/:username/polls/", {
    //     name: "UserPolls",
    //     subscriptions(params) {
    //         this.register('polls', Meteor.subscribe('userPollsByUsername', params.username));
    //     },
    //     action(params) {
    //         mount(<C.PublicPolls userId={ params._id } />);
    //     }
    // });

    // FlowRouter.route("/polls/:_id", {
    //     name: "Poll",
    //     action(params) {
    //         mount(<C.PollViewPage pollId={ params._id } />);
    //     }
    // });

    // FlowRouter.route("/polls/:_id/edit", {
    //     name: "EditPoll",
    //     action(params) {
    //         renderMainLayoutWith(<C.EditablePollPage pollId={ params._id } />);
    //     }
    // });

    // FlowRouter.route("/polls/:_id/preview", {
    //     name: "PollPreview",
    //     action(params) {
    //         renderMainLayoutWith(<C.PollPage pollId={ params._id } preview={ true } />);
    //     }
    // });

    // FlowRouter.route("/polls/:pollId/:pollItemId/chart", {
    //     name: "Chart",
    //     subscriptions(params) {
    //         this.register('pollItems', Meteor.subscribe('pollItems', params.pollId));
    //         this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollItemId', params.pollItemId));
    //     },
    //     action(params, queryParams) {
    //         ReactLayout.render(C.ChartLayout, {
    //             content: <C.PollItemChartWrapper pollItemId={ params.pollItemId } params={ queryParams }/>
    //         });
    //     }
    // });
}