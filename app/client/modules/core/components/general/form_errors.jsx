import React from 'react';

class FormErrors extends React.Component {
    render() {
        if (this.props.errors) {
            return (
                <ul className="list-group">
                    {
                        _.values(this.props.errors).map((errorMessage) => {
                            return <li key={errorMessage} className="list-group-item alert alert-danger">{errorMessage}</li>;
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    }
}

FormErrors.propTypes = {
    errors: React.PropTypes.object
}

export default FormErrors;