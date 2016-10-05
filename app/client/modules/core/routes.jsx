import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/layouts/main_layout.jsx';
import ChartLayout from './components/layouts/chart_layout.jsx';

import UserSignInPage from '../auth/components/user_sign_in/user_sign_in_page.jsx';
import UserSignUpPage from '../auth/components/user_sign_up/user_sign_up_page.jsx';
import HomePage from '../home/components/home_page.jsx';
import NewPoll from '../polls/containers/new_poll.js';
import EditPollPage from '../polls/components/edit_poll/edit_poll_page.jsx';
import PollViewPage from '../polls/components/poll_view/poll_view_page.jsx';
import PollsPreview from '../polls/containers/polls_preview.js';
import UserProfilePage from '../user/components/user_profile_page.jsx';
import PollItemChartWrapper from '../polls/containers/poll_item_chart_wrapper.js';

export default function (injectDeps, {FlowRouter, Meteor}) {
    const MainLayoutCtx = injectDeps(MainLayout);
    const ChartLayoutCtx = injectDeps(ChartLayout);

    FlowRouter.route("/", {
        name: 'Home',
        action() {
            mount(MainLayoutCtx , {
                content: <HomePage />
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

    FlowRouter.route("/polls/new", {
        name: "NewPoll",
        action() {
            mount(MainLayoutCtx, {
                content: <NewPoll />
            });
        }
    });
    
    FlowRouter.route("/polls/edit/:_id", {
        name: "EditPoll",
        action() {
            mount(MainLayoutCtx, {
                content: <EditPollPage />
            });
        }
    });
    
    FlowRouter.route("/:username/polls/", {
        name: "UserPolls",
        action() {
            mount(MainLayoutCtx, {
                content: <PollsPreview type="userPolls" />
            })
        }
    });
    
    FlowRouter.route("/polls", {
        name: "PublicPolls",
     
        action() {
            mount(MainLayoutCtx, {
                content: <PollsPreview type="publicPolls" />
            });
        }
    });

    FlowRouter.route("/:username", {
        name: "UserProfile",
        action(params) {
            mount(MainLayoutCtx, {
                content: <UserProfilePage username={ params.username } />
            })
        }
    });

    FlowRouter.route("/polls/:_id", {
        name: "Poll",
        action() {
            mount(MainLayoutCtx, { 
                content: <PollViewPage />
            });
        }
    });
    
    FlowRouter.route("/polls/:pollId/:pollItemId/chart", {
        name: "Chart",
        subscriptions(params) {
            this.register('pollItems', Meteor.subscribe('pollItems', params.pollId));
            this.register('pollItemOptions', Meteor.subscribe('pollItemOptionsByPollItemId', params.pollItemId));
        },
        action(params, queryParams) {
            mount(ChartLayoutCtx, {
                content: <PollItemChartWrapper 
                            pollItemId={ params.pollItemId } 
                            params={ queryParams } 
                            isChartPreview={true}
                         />
            });
        }
    });

    // FlowRouter.route("/polls/:_id/preview", {
    //     name: "PollPreview",
    //     action(params) {
    //         mount(<C.PollPage pollId={ params._id } preview={ true } />);
    //     }
    // });
}