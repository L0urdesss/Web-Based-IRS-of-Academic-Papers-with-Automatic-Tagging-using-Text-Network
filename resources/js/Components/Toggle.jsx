import React from "react";
import "./../../css/Toggle.css";

const Toggle = ({ checked, onChange, disabled }) => {
  console.log("check inside",checked)
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        checked={checked}
        onChange={onChange}
        value={checked}
        disabled={disabled} 
      />
      <label htmlFor="toggle" className="toggle-label">
        <div className="toggle-inner" />
        <div className="toggle-switch" />
      </label>
      <span className="toggle-text">Only full-texts</span>
    </div>
  );
};

export default Toggle;
