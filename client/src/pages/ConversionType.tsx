import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Mic, Languages, PlaySquare, ArrowRight } from 'lucide-react';
import api from '../api';

const ConversionType = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fileId, fileType } = location.state || {}; // In real app, handle missing state
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [targetLang, setTargetLang] = useState('en');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamic options based on file type
    const getOptions = () => {
        switch (fileType) {
            case 'image':
                return [
                    { id: 'ocr', label: 'Extract Text (OCR)', icon: <FileText /> },
                    { id: 'describe', label: 'Generate Description', icon: <Languages /> }
                ];
            case 'audio':
            case 'video':
                return [
                    { id: 'transcribe', label: 'Transcribe to Text', icon: <FileText /> },
                    { id: 'translate_audio', label: 'Translate Audio', icon: <Mic /> }
                ];
            case 'text':
            case 'pdf':
            case 'ppt':
                return [
                    { id: 'translate_text', label: 'Translate Text', icon: <Languages /> },
                    { id: 'speech_synthesis', label: 'Convert to Speech', icon: <Mic /> }
                ];
            default:
                return [{ id: 'default', label: 'Process File', icon: <FileText /> }];
        }
    };

    const handleProcess = async () => {
        if (!selectedOption) return;
        setIsSubmitting(true);
        try {
            const response = await api.post('/convert', {
                source_file_id: fileId,
                target_language: targetLang,
                conversion_type: selectedOption
            });

            console.log('Conversion started:', response.data);
            navigate('/processing', { state: { conversionId: response.data.id } });
        } catch (error) {
            console.error(error);
            alert('Failed to start conversion');
            setIsSubmitting(false);
        }
    };

    const options = getOptions();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Choose AI Model</h2>
                <p className="text-gray-400">Select how you want to process this {fileType} file</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`flex items-center gap-4 p-6 rounded-xl border transition-all ${selectedOption === opt.id
                                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                                : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <div className={`p-3 rounded-lg ${selectedOption === opt.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                            {opt.icon}
                        </div>
                        <span className="text-lg font-medium">{opt.label}</span>
                    </button>
                ))}
            </div>

            {/* Language Selection if relevant */}
            {(selectedOption?.includes('translate') || selectedOption === 'transcribe') && (
                <div className="space-y-3 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <label className="block text-sm font-medium text-gray-400">Target Language</label>
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                    >
                        <option value="en">English</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="hi">Hindi (हिंदी)</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                    </select>
                </div>
            )}

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleProcess}
                    disabled={!selectedOption || isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all disabled:opacity-50"
                >
                    {isSubmitting ? 'Starting...' : 'Start Processing'}
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default ConversionType;
