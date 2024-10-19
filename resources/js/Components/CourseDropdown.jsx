import React from 'react';

const CourseDropdown = ({ onChange, value }) => {
  return (
    <select onChange={onChange} value={value}>
      <option value="BASLT">BASLT</option>
      <option value="BSCS">BSCS</option>
      <option value="BSES">BSES</option>
      <option value="BSIS">BSIS</option>
      <option value="BSIT">BSIT</option>
    </select>
  );
};

export default CourseDropdown;
