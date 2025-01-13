import React from "react";

const CourseDropdown = ({ onChange, value, className }) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className={`mt-2 block w-full text-sm border border-gray-300 rounded-lg ${className}`} // Ensure full width with w-full
    >
      <option value="BASLT">BASLT</option>
      <option value="BSCS">BSCS</option>
      <option value="BSES">BSES</option>
      <option value="BSIS">BSIS</option>
      <option value="BSIT">BSIT</option>
    </select>
  );
};

export default CourseDropdown;
