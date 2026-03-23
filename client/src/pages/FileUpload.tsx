import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, ArrowRight } from 'lucide-react';
import api from '../api';

const FileUpload = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileType = location.state?.fileType || 'text';
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFileId, setUploadedFileId] = useState<number | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: fileType === 'image' ? { 'image/*': [] } :
            fileType === 'audio' ? { 'audio/*': [] } :
                fileType === 'video' ? { 'video/*': [] } :
                    fileType === 'pdf' ? { 'application/pdf': [] } : undefined
    });

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90));
        }, 200);

        try {
            const formData = new FormData();
            formData.append('file', file);
            // Ensure file_type aligns with backend expected values
            formData.append('file_type', fileType);

            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            clearInterval(interval);
            setProgress(100);
            setUploadedFileId(response.data.id);

            // Navigate after short delay
            setTimeout(() => {
                navigate('/conversion-type', { state: { fileId: response.data.id, fileType } });
            }, 500);

        } catch (error) {
            console.error(error);
            clearInterval(interval);
            setUploading(false);
            setProgress(0);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Upload your {fileType}</h2>
                <p className="text-gray-400">Drag and drop your file below</p>
            </div>

            <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20">
                <div
                    {...getRootProps()}
                    className={`cursor-pointer bg-gray-900/90 rounded-xl border-2 border-dashed h-80 flex flex-col items-center justify-center transition-all ${isDragActive ? 'border-blue-500 bg-gray-800' : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/50'
                        }`}
                >
                    <input {...getInputProps()} />
                    {!file ? (
                        <>
                            <div className="p-4 bg-gray-800 rounded-full mb-4">
                                <UploadCloud size={48} className="text-blue-400" />
                            </div>
                            <p className="text-xl font-medium text-gray-300">Drag & Drop or Click to Upload</p>
                            <p className="text-sm text-gray-500 mt-2">Supports {fileType} formats</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center p-6 w-full max-w-sm">
                            <File size={48} className="text-emerald-500 mb-4" />
                            <p className="text-gray-200 font-medium truncate w-full text-center">{file.name}</p>
                            <p className="text-gray-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                            {!uploading && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="mt-4 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                                >
                                    <X size={14} /> Remove file
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {uploading && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                >
                    Next Step
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
