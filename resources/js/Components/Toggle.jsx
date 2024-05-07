import React, { useState } from "react";
import "./../../css/Toggle.css";

const Toggle = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    // Logic to handle "Only full-texts" toggle
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-checkbox"
        checked={checked}
        onChange={handleChange}
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
