import React, { useState } from 'react';
import * as ethers from 'ethers';
import ExamForm from './ExamForm';
import ExamDetails from './ExamDetails';
import IPFSUploader from './IPFSUploader';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import RoleSelection from './RoleSelection';
import ExamDistributionABI from './ExamDistribution.json';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Wallet, FileUp, List } from 'lucide-react';

const contractAddress = '0xA256e0Ba7475bf40Ad425EfeFc76bDD6F06A6d90';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentHash, setCurrentHash] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState(null); // New state to manage role selection

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ExamDistributionABI.abi, signer);
      
      setProvider(provider);
      setContract(contract);
      setIsConnected(true);

      // Listen for account changes
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please make sure MetaMask is installed and try again.');
    }
  };

  const handleUpload = (hash) => {
    setCurrentHash(hash);
    console.log('File uploaded with hash:', hash);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              <span>Exam Paper Distribution System</span>
              <button
                onClick={connectWallet}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isConnected 
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <Wallet size={20} />
                {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </button>
            </CardTitle>
          </CardHeader>
        </Card>

        {!role && (
          <RoleSelection onSelectRole={handleRoleSelect} />
        )}

        {isConnected && role === 'student' && (
          <StudentDashboard contract={contract} />
        )}

        {isConnected && role === 'teacher' && (
          <TeacherDashboard contract={contract} ipfsHash={currentHash} />
        )}
      </div>
    </div>
  );
};

export default App;
