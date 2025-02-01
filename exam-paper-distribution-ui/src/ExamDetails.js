// src/components/ExamDetails.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const ExamDetails = ({ contract }) => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      if (!contract) return;

      setLoading(true);
      try {
        const examCount = await contract.examCount();
        const upcomingList = [];

        for (let i = 1; i <= examCount; i++) {
          const exam = await contract.exams(i);
          const examData = {
            name: exam.ipfsHash, // Change as per your contract
            releaseTime: exam.releaseTime,
            ipfsHash: exam.ipfsHash
          };

          if (examData.releaseTime > Math.floor(Date.now() / 1000)) {
            upcomingList.push(examData);
          }
        }

        setUpcomingExams(upcomingList);
      } catch (error) {
        console.error('Error loading exams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExams();

    return () => {
      setUpcomingExams([]);
    };
  }, [contract]);

  if (loading) {
    return <div className="empty-message">Loading exams...</div>;
  }

  return (
    <div>
      <h2 className="dashboard-header">Upcoming Exams</h2>
      {upcomingExams.length === 0 ? (
        <p className="empty-message">No upcoming exams</p>
      ) : (
        <div className="space-y-4">
          {upcomingExams.map((exam, index) => (
            <div key={index} className="card">
              <div className="card-header">{exam.name}</div>
              <div className="card-content">
                <p>Release Time: {new Date(exam.releaseTime * 1000).toLocaleString()}</p>
                <a
                  href={`https://ipfs.io/ipfs/${exam.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exam-link"
                >
                  View Paper
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamDetails;
