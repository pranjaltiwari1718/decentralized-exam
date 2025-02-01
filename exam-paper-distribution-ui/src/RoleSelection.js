// src/components/RoleSelection.js
import React from 'react';
import { User, BookOpen } from 'lucide-react';
import './RoleSelection.css'; // Import the custom CSS

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="role-selection-container">
      <h2 className="role-title">Select Your Role</h2>

      <div className="role-buttons">
        {/* Student Button */}
        <button
          onClick={() => onSelectRole('student')}
          className="role-button role-button--student"
          title="Access student dashboard"
        >
          <User size={24} />
          <span>Student</span>
        </button>

        {/* Teacher Button */}
        <button
          onClick={() => onSelectRole('teacher')}
          className="role-button role-button--teacher"
          title="Access teacher dashboard"
        >
          <BookOpen size={24} />
          <span>Teacher</span>
        </button>
      </div>

      <p className="role-description">Please select a role to continue</p>
    </div>
  );
};

export default RoleSelection;
