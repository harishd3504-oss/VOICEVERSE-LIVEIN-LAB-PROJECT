import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Check } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

const LanguagePreference = () => {
    const { user, login } = useAuth(); // We might need to refresh user data context
    const navigate = useNavigate();
    const [selected, setSelected] = useState(user?.preferred_language || 'en');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Hypothetical endpoint to update user preference
            // In a real app we would have an update user endpoint
            // await api.put('/users/me', { preferred_language: selected });

            // For now, let's assume we proceed. In a real app we'd update context.
            console.log('Language set to:', selected);
            navigate('/file-type');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Choose Your Language</h2>
                <p className="text-gray-400">Select your preferred language for the interface</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setSelected(lang.code)}
                        className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${selected === lang.code
                                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                            }`}
                    >
                        <div className="space-y-1">
                            <span className={`text-3xl block mb-2 ${selected === lang.code ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {lang.native}
                            </span>
                            <span className={`text-sm font-medium uppercase tracking-wider ${selected === lang.code ? 'text-white' : 'text-gray-400'}`}>
                                {lang.name}
                            </span>
                        </div>

                        {selected === lang.code && (
                            <div className="absolute top-4 right-4 text-blue-500">
                                <Check size={20} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default LanguagePreference;
