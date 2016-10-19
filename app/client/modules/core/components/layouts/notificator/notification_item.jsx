import React from 'react';
import ReactDOM from 'react-dom';

class NotificationItem extends React.Component {
	constructor() {
		super();
		this.unmount = this.unmount.bind(this)
		this.state = {
			showNotification: true
		}	
	}
	
	componentWillReceiveProps() {
		this.setState({showNotification: true})
	}

	unmount() {	
		setTimeout(function() {
			this.setState({showNotification: false})
		}.bind(this), 2000)
	}

	render() {
		const { text, type } = this.props;
		
		if(!this.state.showNotification) {
			return null;
		}

		this.unmount();
		
		return (
			<div className="card notification-item">
				<span className={ type }>{ text }</span>
			</div>
		)
	}
}

export default NotificationItem;