import React, { useState } from 'react';
import IPFSUploader from './IPFSUploader';

const ExamForm = ({ contract }) => {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [authorizedCenters, setAuthorizedCenters] = useState('');
  const [ipfsHash, setIpfsHash] = useState(''); // State for IPFS hash
  const [examDetails, setExamDetails] = useState(null); // State for exam details

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!contract) {
        alert('Please connect your wallet first');
        return;
      }

      const releaseTime = Math.floor(new Date(examDate).getTime() / 1000);
      const centersArray = authorizedCenters.split(',').map(addr => addr.trim());

      // Call createExam with the expected parameters
      const tx = await contract.createExam(ipfsHash, releaseTime, centersArray);
      const receipt = await tx.wait();

      // Assuming the ExamCreated event emits the examId
      const examId = receipt.events[0].args.examId.toNumber(); // Change index if needed based on emitted events

      // Fetch the newly created exam details
      fetchExamDetails(examId);

      alert('Exam created successfully!');

      // Clear form
      setExamName('');
      setExamDate('');
      setAuthorizedCenters('');
      setIpfsHash(''); // Clear IPFS hash
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam. Please try again.');
    }
  };

  const fetchExamDetails = async (examId) => {
    try {
      const exam = await contract.exams(examId);
      setExamDetails({
        ipfsHash: exam.ipfsHash,
        releaseTime: new Date(exam.releaseTime * 1000).toLocaleString(),
        authorizedCenters: exam.authorizedCenters,
        distributed: exam.distributed,
      });
    } catch (error) {
      console.error('Error fetching exam details:', error);
    }
  };

  const handleIPFSUpload = (hash) => {
    setIpfsHash(hash);
    console.log('Exam paper uploaded with IPFS hash:', hash);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Exam Name</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Authorized Centers (comma-separated)</label>
          <textarea
            value={authorizedCenters}
            onChange={(e) => setAuthorizedCenters(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <IPFSUploader onUpload={handleIPFSUpload} />
          {ipfsHash && (
            <p className="text-green-600 mt-2">Exam paper uploaded with IPFS hash: {ipfsHash}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={!ipfsHash} // Disable button if IPFS hash is not available
        >
          Create Exam
        </button>
      </form>

      {examDetails && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold">Exam Details</h2>
          <p><strong>IPFS Hash:</strong> {examDetails.ipfsHash}</p>
          <p><strong>Release Time:</strong> {examDetails.releaseTime}</p>
          <p><strong>Authorized Centers:</strong> {examDetails.authorizedCenters.join(', ')}</p>
          <p><strong>Distributed:</strong> {examDetails.distributed ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
