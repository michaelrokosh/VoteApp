import React from 'react';


class NotificatorComponent extends React.Component {
	constructor() {
		super();

		this.clearErrors = this.clearErrors.bind(this)

		this.state = {
			notification: null
		}
	}

	setNotification(notification) {
		this.setState({
			notification: notification
		});
	}
	
	clearNotification() {
		setTimeout(function() {
			this.setState({notification: null})
		}.bind(this), 2000)
	}

	render() {
		const { notification } = this.state;
	
		if(!notification) {
			return null;
		}

		this.clearNotification();
		return (
			<div className="notificator">
				<div className="card notification-item">
					<span className={ notification.type }>{ notification.text }</span>
				</div>
			</div>
		)
	}
}

export default NotificatorComponent;