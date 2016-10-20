import React from 'react';

class FormInput extends React.Component {
  render() {
    const { 
      type, 
      label, 
      name, 
      placeholder, 
      value,
      hasError,  
      onBlur,
      className 
    } = this.props;

    let classNameCtx = new String(className);
    let inputType;
    if(hasError) {
      classNameCtx += " has-error";
    }
    
    if(type === 'text') {
      inputType = (
          <input
            type={ type }
            defaultValue={ value }
            placeholder={ placeholder }
            onBlur={ onBlur }  
            className={ classNameCtx }
            name={ name.toLowerCase() }
          />
      )
    }

    if (type === 'textarea') {
      inputType = (
        <textarea 
            type={ type }
            defaultValue={ value }
            placeholder={ placeholder }
            onBlur={ onBlur }  
            className={ classNameCtx }
            name={ name.toLowerCase() }>
         </textarea> 
      )
    }

    return (
      <div>
        { label === "none" ? "" : <label htmlFor={ name.toLowerCase() } className="control-label">{ label }</label> }
        { inputType }
      </div>
    )

  }
}

FormInput.propTypes =  {
    hasError: React.PropTypes.bool,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    onKeyUp: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func
}

export default FormInput;