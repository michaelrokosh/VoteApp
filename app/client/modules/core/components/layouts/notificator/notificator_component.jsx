import React from 'react';

import NotificationItem from './notification_item.jsx';

class NotificatorComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			notification: {}
		}
	}

	setNotification(notification) {
		this.setState({
			notification: notification
		});
	}

	render() {
		const { notification } = this.state;
	
		return (
			<div className="notificator">
				<NotificationItem key={ notification.text } type={ notification.type } text={ notification.text } />
			</div>
		)
	}
}

export default NotificatorComponent;