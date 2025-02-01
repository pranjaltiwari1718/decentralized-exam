import React from 'react';
import ExamForm from './ExamForm';
import ExamDetails from './ExamDetails';
import MarksEntry from './MarksEntry';
import './Dashboard.css';

const TeacherDashboard = ({ contract }) => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Welcome, Teacher!</h2>
      <ExamForm contract={contract} />
      <ExamDetails contract={contract} />
    </div>
  );
};

export default TeacherDashboard;
