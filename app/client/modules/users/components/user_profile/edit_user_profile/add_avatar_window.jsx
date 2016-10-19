import React from 'react';

class AddAvatar extends React.Component {
	changeAvatar(e) {
		const { changeAvatar } = this.props;
		const imageFile  = e.target.files[0];

		changeAvatar(imageFile);
	}

	render() {
		const { isOpen } = this.props;
		
		if(!isOpen) {
			return null;
		}

		return (
			 <div className="col s4 m4 offset-m4">
			 	<input type="file" onChange={ e => this.changeAvatar(e) }/>
			 </div>
		)
	}
}

export default AddAvatar;