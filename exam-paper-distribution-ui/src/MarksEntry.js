// src/components/MarksEntry.js
import React, { useState } from 'react';

const MarksEntry = ({ contract }) => {
  const [examId, setExamId] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [marks, setMarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.enterMarks(examId, studentAddress, marks);
      alert('Marks entered successfully!');
      setExamId('');
      setStudentAddress('');
      setMarks('');
    } catch (error) {
      console.error('Error entering marks:', error);
      alert('Failed to enter marks. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Exam ID</label>
        <input
          type="text"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Student Address</label>
        <input
          type="text"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Marks</label>
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Enter Marks
      </button>
    </form>
  );
};

export default MarksEntry;
