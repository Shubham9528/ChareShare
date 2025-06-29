import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, FileText, Trash2, RotateCcw, Check, AlertCircle, Image, Folder, X, Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { usePatientProfile } from '../../../../hooks/usePatientProfile';
import { dbService } from '../../../../lib/supabase';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  file: File;
}

export const UploadDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { medicalRecords, addMedicalRecord, deleteMedicalRecord, loading } = usePatientProfile();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'gallery' | 'file' | null>(null);

  // Load existing medical records
  useEffect(() => {
    console.log('Medical records:', medicalRecords);
  }, [medicalRecords]);

  const handleBack = () => {
    navigate('/patient/profile/setting');
  };

  const handleCameraScan = () => {
    navigate('/patient/profile/setting/camerascan');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadFileToStorage = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      // Upload to storage
      const path = `medical_records/${user.id}/${Date.now()}_${file.name}`;
      await dbService.uploadFile('documents', path, file);
      
      // Get public URL
      return dbService.getFileUrl('documents', path);
    } catch (error) {
      console.error('Error uploading file to storage:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File, fileId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      // Upload file to storage
      const documentUrl = await uploadFileToStorage(file);
      
      // Add record to database
      await addMedicalRecord({
        record_type: file.type.startsWith('image/') ? 'Image' : 'Document',
        document_name: file.name,
        document_url: documentUrl
      });
      
      // Update local state
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          return { ...f, status: 'success', progress: 100 };
        }
        return f;
      }));
    } catch (error) {
      console.error('Error uploading medical record:', error);
      
      // Update local state to show error
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          return { ...f, status: 'error', progress: 100 };
        }
        return f;
      }));
      
      throw error;
    }
  };

  const simulateUpload = async (file: File): Promise<void> => {
    const fileId = Date.now().toString();
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploading',
      progress: 0,
      file: file
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newProgress = (f.progress || 0) + Math.random() * 30;
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Start actual upload to storage and database
            handleFileUpload(file, fileId).catch(err => {
              console.error('Failed to upload file:', err);
            });
            
            return { ...f, progress: 100 };
          }
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 200);
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size (25MB limit)
      if (file.size > 25 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 25MB.`);
        continue;
      }

      try {
        await simulateUpload(file);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleGalleryUpload = () => {
    setUploadMethod('gallery');
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', 'image/*');
      fileInputRef.current.setAttribute('capture', 'camera');
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = () => {
    setUploadMethod('file');
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.setAttribute('accept', '.pdf,.doc,.docx,.jpg,.jpeg,.png,.heic');
      fileInputRef.current.click();
    }
  };

  const handleClickToUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.setAttribute('accept', '.pdf,.doc,.docx,.jpg,.jpeg,.png,.heic');
      fileInputRef.current.click();
    }
  };

  const handleRetryUpload = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file) {
      // Remove the failed file and try again
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      simulateUpload(file.file);
    }
  };

  const handleDeleteFile = async (fileId: string, isExistingRecord: boolean = false) => {
    if (isExistingRecord) {
      try {
        await deleteMedicalRecord(fileId);
      } catch (error) {
        console.error('Failed to delete medical record:', error);
        alert('Failed to delete record. Please try again.');
      }
    } else {
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'heic'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">
            Upload Document
          </h1>
          
          {/* Empty div for spacing */}
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Description */}
        <div className="text-center">
          <p className="text-gray-600 leading-relaxed">
            Upload your health or insurance benefit booklet to track your benefits automatically.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Upload Icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <button
              onClick={handleClickToUpload}
              className="text-blue-600 font-semibold hover:underline focus:outline-none focus:underline"
            >
              Click to Upload
            </button>
            <span className="text-gray-600"> or drag and drop</span>
            <p className="text-sm text-gray-500">(Max. File size: 25 MB)</p>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Upload Health Benefit Button */}
        <button
          onClick={handleClickToUpload}
          className="w-full py-4 px-6 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
          style={{
            background: 'linear-gradient(90deg, #3B82F6 0%, #234C90 100%)'
          }}
        >
          Upload Health Benefit
        </button>

        {/* Camera Scan Button */}
        <button
          onClick={handleCameraScan}
          className="w-full py-4 px-6 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-3"
        >
          <Camera className="w-5 h-5" />
          <span>Camera Scan</span>
        </button>

        {/* Upload Method Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGalleryUpload}
            className="flex items-center justify-center space-x-3 py-4 px-6 border-2 border-blue-500 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Image className="w-5 h-5" />
            <span>Gallery</span>
          </button>
          
          <button
            onClick={handleFileUpload}
            className="flex items-center justify-center space-x-3 py-4 px-6 border-2 border-blue-500 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Folder className="w-5 h-5" />
            <span>File</span>
          </button>
        </div>

        {/* Uploaded Files List */}
        {(uploadedFiles.length > 0 || medicalRecords.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
            
            <div className="space-y-3">
              {/* Currently uploading files */}
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`bg-white rounded-2xl p-4 border transition-all duration-200 ${
                    file.status === 'error' 
                      ? 'border-red-200 bg-red-50' 
                      : file.status === 'success'
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                      {getFileIcon(file.name)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(file.status)}
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        {file.status === 'uploading' && (
                          <span className="text-sm text-blue-600">{Math.round(file.progress || 0)}%</span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {file.status === 'uploading' && (
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === 'error' && (
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm text-red-600">Upload failed, please try again</p>
                          <button
                            onClick={() => handleRetryUpload(file.id)}
                            className="text-sm text-red-600 font-medium hover:underline focus:outline-none focus:underline"
                          >
                            Try again
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Previously uploaded medical records */}
              {medicalRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                      {getFileIcon(record.document_name)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">{record.document_name}</p>
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <button
                            onClick={() => handleDeleteFile(record.id, true)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{record.record_type} • {new Date(record.upload_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Supported File Types</h4>
          <p className="text-blue-800 text-sm">
            PDF, DOC, DOCX, JPG, JPEG, PNG, HEIC
          </p>
          <p className="text-blue-800 text-sm mt-1">
            Maximum file size: 25MB per file
          </p>
        </div>
      </div>
    </div>
  );
};