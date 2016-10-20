import React from 'react';
import ReactDOM from 'react-dom';
import NotificatorComponent from '../components/layouts/notificator_component.jsx';

export default {
	_notificator: undefined,

	_init() {
		const NotificatorElement = React.createElement(NotificatorComponent);
		this._notificator = ReactDOM.render(NotificatorElement,document.getElementById('notificator-container'));
	},
	
	succes(text) {
		if(!this._notificator) {
			this._init();
		}

		this._notificator.setNotification({type: 'succes', text: text})
	},

	error(text) {
		if(!this._notificator) {
			this._init();
		}

		this._notificator.setNotification({type: 'error', text: text})
	},

	warning(text) {
		if(!this._notificator) {
			this._init();
		}

		this._notificator.setNotification({type: 'warning', text: text})
	}
}
