import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, Circle } from 'lucide-react';
import api from '../api';

const Processing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { conversionId } = location.state || {}; // In real app, handle missing state
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([
        { label: 'Uploading File', status: 'completed' },
        { label: 'Analyzing Content', status: 'processing' },
        { label: 'Running AI Model', status: 'pending' },
        { label: 'Generating Output', status: 'pending' }
    ]);

    // Mock checking status or simulate steps
    useEffect(() => {
        if (!conversionId) return;

        // Simulate flow for UI demo purposes since backend is mocked with simple sleep
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= 3) {
                    clearInterval(interval);
                    setTimeout(() => navigate('/result', { state: { conversionId } }), 1000);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [conversionId, navigate]);

    // Sync steps visual state
    useEffect(() => {
        setSteps(prev => prev.map((step, idx) => ({
            ...step,
            status: idx < currentStep ? 'completed' : idx === currentStep ? 'processing' : 'pending'
        })));
    }, [currentStep]);

    return (
        <div className="max-w-2xl mx-auto py-12 animate-fade-in text-center">
            <div className="mb-12">
                <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-6 relative">
                    <Loader2 size={48} className="text-blue-400 animate-spin" />
                    <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Processing Your Content</h2>
                <p className="text-gray-400">Our AI is working its magic...</p>
            </div>

            <div className="space-y-6 text-left bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="relative">
                            {step.status === 'completed' ? (
                                <CheckCircle2 className="text-emerald-500" size={24} />
                            ) : step.status === 'processing' ? (
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500 blur-sm rounded-full opacity-50 animate-pulse"></div>
                                    <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                                </div>
                            ) : (
                                <Circle className="text-gray-600" size={24} />
                            )}
                            {idx < steps.length - 1 && (
                                <div className={`absolute left-3 top-7 w-0.5 h-6 ${step.status === 'completed' ? 'bg-emerald-500/50' : 'bg-gray-700'}`}></div>
                            )}
                        </div>
                        <span className={`text-lg font-medium ${step.status === 'completed' ? 'text-emerald-400' :
                                step.status === 'processing' ? 'text-white' : 'text-gray-500'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Processing;
