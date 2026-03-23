import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Image, Mic, Video, Presentation, FileCode2 } from 'lucide-react';

const fileTypes = [
    { id: 'text', label: 'Text Document', icon: <FileText size={40} />, desc: 'Convert text to other languages or speech' },
    { id: 'image', label: 'Image', icon: <Image size={40} />, desc: 'Extract text from images (OCR)' },
    { id: 'audio', label: 'Audio', icon: <Mic size={40} />, desc: 'Transcribe audio to text' },
    { id: 'video', label: 'Video', icon: <Video size={40} />, desc: 'Generate subtitles or transcripts' },
    { id: 'ppt', label: 'Presentation', icon: <Presentation size={40} />, desc: 'Translate PowerPoint slides' },
    { id: 'pdf', label: 'PDF Document', icon: <FileCode2 size={40} />, desc: 'Parse and convert PDF content' },
];

const FileTypeSelection = () => {
    const navigate = useNavigate();

    const handleSelect = (typeId: string) => {
        navigate('/upload', { state: { fileType: typeId } });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">What would you like to convert?</h2>
                <p className="text-gray-400">Select the type of content you want to upload</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fileTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => handleSelect(type.id)}
                        className="group p-8 text-left bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800 hover:border-blue-500/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="p-3 bg-gray-900 rounded-lg inline-block text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform">
                                {type.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-white mb-1">{type.label}</h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-400">{type.desc}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FileTypeSelection;
