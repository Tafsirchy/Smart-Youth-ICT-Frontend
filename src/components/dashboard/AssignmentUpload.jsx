'use client';

import React, { useState } from 'react';
import { HiOutlineCloudUpload, HiOutlineDocumentText } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function AssignmentUpload({ assignmentId, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    // TODO: Connect to backend API when the route is ready
    // e.g., const formData = new FormData(); formData.append('file', file);
    // await api.post(`/assignments/${assignmentId}/submit`, formData);
    
    setTimeout(() => {
      setIsUploading(false);
      setFile(null);
      toast.success('Assignment uploaded successfully!');
      if (onUploadSuccess) onUploadSuccess();
    }, 1500);
  };

  return (
    <div className="border border-dashed border-neutral-300 rounded-xl p-6 text-center bg-neutral-50 hover:bg-neutral-100 transition-colors">
      <input
        type="file"
        id={`upload-${assignmentId}`}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor={`upload-${assignmentId}`}
        className="cursor-pointer flex flex-col items-center justify-center"
      >
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
          <HiOutlineCloudUpload size={24} />
        </div>
        <p className="text-sm font-medium text-neutral-800">
          Click to upload <span className="text-neutral-500 font-normal">or drag and drop</span>
        </p>
        <p className="text-xs text-neutral-400 mt-1">PDF, ZIP, or DOCX (Max 10MB)</p>
      </label>

      {file && (
        <div className="mt-4 flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <HiOutlineDocumentText className="text-blue-500 shrink-0" size={20} />
            <span className="text-sm text-neutral-700 truncate">{file.name}</span>
          </div>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="ml-3 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 disabled:opacity-50 shrink-0 transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
}
