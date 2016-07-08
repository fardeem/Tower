import React from 'react';

import SubjectForm from './SubjectForm.js';


const SubjectsList = ({ subjects }) => (
  <div>
    {subjects.map(subject => <SubjectForm key={subject._id} data={subject} />)}
  </div>
);

SubjectsList.propTypes = {
  subjects: React.PropTypes.array,
};

export default SubjectsList;
