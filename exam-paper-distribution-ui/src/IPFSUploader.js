import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Link, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

const PINATA_API_KEY = '722335c105dacbebe7be';
const PINATA_SECRET_API_KEY = 'ad4e807023c6682ecb4c1eacefac6edd8d1c52586872026a1639d9fcfea0052a';

const IPFSUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const metadata = JSON.stringify({
        name: fileName,
      });
      formData.append('pinataMetadata', metadata);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      const hash = response.data.IpfsHash;
      setIpfsHash(hash);
      onUpload?.(hash);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const getIpfsUrl = (hash) => `https://gateway.pinata.cloud/ipfs/${hash}`;

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={24} />
          IPFS File Uploader
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Select File
              </div>
            </label>
            {fileName && (
              <span className="text-sm text-gray-600 truncate max-w-xs">
                {fileName}
              </span>
            )}
          </div>

          <button
            onClick={uploadFile}
            disabled={isUploading || !file}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload to IPFS
              </>
            )}
          </button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {ipfsHash && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <h4 className="font-semibold text-lg">File Successfully Uploaded!</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">IPFS Hash:</p>
              <code className="block p-2 bg-gray-100 rounded break-all">
                {ipfsHash}
              </code>
            </div>
            <a
              href={getIpfsUrl(ipfsHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mt-2"
            >
              <Link size={16} />
              View on IPFS Gateway
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IPFSUploader;
