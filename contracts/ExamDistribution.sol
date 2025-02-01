// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamDistribution {
    struct Exam {
        string ipfsHash;  // IPFS hash of the exam paper
        uint256 releaseTime;  // Timestamp when the exam can be accessed
        address[] authorizedCenters;  // List of authorized exam centers
        bool distributed;  // Indicates if the key has been released
    }

    mapping(uint256 => Exam) public exams;  // Mapping to store exams
    uint256 public examCount;  // Counter to track the number of exams

    event ExamCreated(uint256 examId, uint256 releaseTime);
    event KeyReleased(uint256 examId, address center);

    // Function to create an exam
    function createExam(
        string memory _ipfsHash,
        uint256 _releaseTime,
        address[] memory _authorizedCenters
    ) public {
        examCount++;
        exams[examCount] = Exam({
            ipfsHash: _ipfsHash,
            releaseTime: _releaseTime,
            authorizedCenters: _authorizedCenters,
            distributed: false
        });
        emit ExamCreated(examCount, _releaseTime);
    }

    // Getter function to return authorized centers of a specific exam
    function getAuthorizedCenters(uint256 _examId) public view returns (address[] memory) {
        return exams[_examId].authorizedCenters;
    }

    // Function to release the exam key
    function releaseKey(uint256 _examId) public {
        Exam storage exam = exams[_examId];
        require(block.timestamp >= exam.releaseTime, "The exam cannot be accessed yet.");
        require(!exam.distributed, "Exam key already released.");

        bool authorized = false;
        for (uint256 i = 0; i < exam.authorizedCenters.length; i++) {
            if (exam.authorizedCenters[i] == msg.sender) {
                authorized = true;
                break;
            }
        }
        require(authorized, "You are not authorized to access this exam.");

        exam.distributed = true;
        emit KeyReleased(_examId, msg.sender);
    }
}
