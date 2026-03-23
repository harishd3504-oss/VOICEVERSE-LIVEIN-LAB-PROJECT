import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Copy, Download, Play, Pause, ArrowLeft, Check } from 'lucide-react';

const Result = () => {
    const location = useLocation();
    const { conversionId } = location.state || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [copied, setCopied] = useState(false);

    // Mock data since we don't have real backend AI results yet
    const resultData = {
        original: {
            type: 'text',
            content: "Artificial Intelligence is transforming vocational education in India. It enables personalized learning paths and bridges language barriers.",
            lang: 'English'
        },
        converted: {
            type: 'text',
            content: "செயற்கை நுண்ணறிவு இந்தியாவில் தொழிற்கல்வியை மாற்றியமைக்கிறது. இது தனிப்பயனாக்கப்பட்ட கற்றல் பாதைகளை செயல்படுத்துகிறது மற்றும் மொழி தடைகளை குறைக்கிறது.",
            lang: 'Tamil'
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(resultData.converted.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        // Logic for TTS playback would go here
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
            <div className="flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                    Conversion Complete
                </h2>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
                {/* Original Content */}
                <div className="flex flex-col bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="p-4 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Original ({resultData.original.lang})</span>
                    </div>
                    <div className="flex-1 p-6 text-gray-300 leading-relaxed overflow-auto">
                        {resultData.original.content}
                    </div>
                </div>

                {/* Converted Content */}
                <div className="flex flex-col bg-gray-800 rounded-2xl border border-blue-500/30 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] relative">
                    <div className="p-4 bg-blue-900/20 border-b border-blue-500/20 flex justify-between items-center">
                        <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">Converted ({resultData.converted.lang})</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePlay}
                                className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-300 transition-colors"
                                title="Listen"
                            >
                                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            </button>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-300 transition-colors"
                                title="Copy text"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 text-white text-lg leading-relaxed overflow-auto">
                        {resultData.converted.content}
                    </div>

                    <div className="p-4 border-t border-gray-700 bg-gray-900/50 flex justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                            <Download size={16} />
                            Download Result
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
