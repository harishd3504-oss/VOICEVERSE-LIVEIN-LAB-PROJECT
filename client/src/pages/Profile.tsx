import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Settings, Shield, Bell } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Profile & Settings</h2>
                <p className="text-gray-400">Manage your account preferences</p>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-8 flex items-center gap-6 border-b border-gray-700 bg-gray-800/50">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                        {user?.full_name ? user.full_name[0].toUpperCase() : user?.email[0].toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{user?.full_name || 'User'}</h3>
                        <p className="text-gray-400">{user?.email}</p>
                        <div className="mt-2 text-sm text-emerald-400 flex items-center gap-2">
                            <Shield size={14} />
                            <span>Verified Account</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Sections */}
                    <section className="space-y-4">
                        <h4 className="text-lg font-medium text-white flex items-center gap-2">
                            <Settings size={20} className="text-gray-400" />
                            Preferences
                        </h4>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Dark Mode</p>
                                    <p className="text-sm text-gray-500">Use system theme preference</p>
                                </div>
                                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Default Language</p>
                                    <p className="text-sm text-gray-500">{user?.preferred_language === 'ta' ? 'Tamil' : 'English'}</p>
                                </div>
                                <button className="text-blue-400 text-sm font-medium hover:text-blue-300">Change</button>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h4 className="text-lg font-medium text-white flex items-center gap-2">
                            <Bell size={20} className="text-gray-400" />
                            Notifications
                        </h4>
                        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
                            <div>
                                <p className="text-white font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates about your file processing</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
