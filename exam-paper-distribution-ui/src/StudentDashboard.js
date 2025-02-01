import React, { useState } from 'react';
import ExamDetails from './ExamDetails';
import IPFSUploader from './IPFSUploader';
import './StudentDashboard.css'; // Import the Student Dashboard CSS

const StudentDashboard = ({ contract }) => {
  const [answerHash, setAnswerHash] = useState('');

  const handleAnswerUpload = (hash) => {
    setAnswerHash(hash);
    console.log('Answer sheet uploaded with hash:', hash);
  };

  return (
    <div className="student-dashboard">
      <h2 className="dashboard-header">Welcome, Student!</h2>
      
      <div className="upload-section">
        <h3 className="upload-title">Upload Answer Sheet</h3>
        <IPFSUploader onUpload={handleAnswerUpload} />
        {answerHash && (
          <p className="success-message">Answer sheet uploaded with IPFS hash: {answerHash}</p>
        )}
      </div>

      <div className="card">
        <h3 className="card-header">Exam Details</h3>
        <ExamDetails contract={contract} />
      </div>
    </div>
  );
};

export default StudentDashboard;
