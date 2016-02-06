C.FormInput = React.createClass({
  propTypes: {
    hasError: React.PropTypes.bool,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    onKeyUp: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func
  },

  shouldComponentUpdate() {
    return true;
  },

  render() {
    const { type, label, name, placeholder, value, onKeyUp, onBlur, onChange } = this.props;
    let { className } = this.props
    let inputType;

    if (this.props.hasError) {
      className += " has-error";
    }

    switch (type) {
      case "textarea":
        if (onChange) {
          inputType = (
            <textarea type={ type } className={ className } name={ name.toLowerCase() } placeholder={ placeholder } onChange={ onChange } value={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }></textarea>
          );
        } else {
          inputType = (
            <textarea type={ type } className={ className } name={ name.toLowerCase() } placeholder={ placeholder } defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }></textarea>
          );
        }
        break;
      default:
        if (onChange) {
          inputType = (
            <input type={ type } className={ className } name={ name.toLowerCase() } placeholder={ placeholder } onChange={ onChange } value={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }/>
          );
        } else {
          inputType = (
            <input type={ type } className={ className } name={ name.toLowerCase() } placeholder={ placeholder } defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }/>
          );
        }
        break;
    }

    return (
      <div>
        { label === "none" ? "" : <label htmlFor={ name.toLowerCase() } className="control-label">{ name }</label> }
        { inputType }
      </div>
    )

  }
});