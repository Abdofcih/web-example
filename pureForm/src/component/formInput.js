import React, { useState } from 'react';
import './formInput.css';

const FormInput = ({
  label,
  id,
  value,
  onChange,
  errorMessage,
  ...otherProps
}) => {
  const [blured, setBlured] = useState(false);
  const handleBlur = () => {
    setBlured(true);
  };
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        isBlured={blured.toString()}
        {...otherProps}
      />
      <span>{errorMessage}</span>
    </div>
  );
};
export default FormInput;
