import React from 'react';
import Select from 'react-select';
import { createContainer } from 'meteor/react-meteor-data';

import { Subjects } from '../../api/models/subjects.js';


const SubjectPicker = ({ value, options, onChange }) => {
  function formatChange(data) {
    return onChange(data.map(item => item.value));
  }

  return (
    <Select
      name="subject-picker"
      value={value}
      options={options}
      multi
      onChange={formatChange}
    />
  );
};

SubjectPicker.propTypes = {
  value: React.PropTypes.array,
  options: React.PropTypes.array,
  onChange: React.PropTypes.func,
};


export default createContainer(({ value = [], onChange }) => {
  const mapToProps = ({ _id, name, grade }) => ({
    value: _id,
    label: `Gr. ${grade} — ${name}`,
  });

  const options = { sort: { grade: 1 } };

  return {
    options: Subjects.find({}, options).map(mapToProps),
    value: Subjects.find({ _id: { $in: value } }, options).map(mapToProps),
    onChange,
  };
}, SubjectPicker);
