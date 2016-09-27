import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/layouts/main_layout.jsx';

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);
    console.log(MainLayoutCtx);
    FlowRouter.route("/", {
        name: 'Home',
        action(params) {
            mount(MainLayoutCtx , {
                content: <h1>Hi!</h1>
            })
        }
    });

    // FlowRouter.route("/sign-in", {
    //     name: "SignIn",
    //     action(params) {
    //         mount(<C.UserSignInPage />);
    //     }
    // });

    // FlowRouter.route("/sign-up", {
    //     name: "SignUp",
    //     action(params) {
    //         mount(<C.UserSignUpPage />);
    //     }
    // });

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