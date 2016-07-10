import React from 'react';

import TeacherForm from './TeacherForm.js';


const TeachersList = ({ teachers }) => (
  <div>
    {teachers.map(teacher => <TeacherForm key={teacher._id} data={teacher} />)}
  </div>
);

TeachersList.propTypes = {
  teachers: React.PropTypes.array,
};

export default TeachersList;
