import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Mic, Clock, Plus } from 'lucide-react';

const Dashboard = () => {
    // Mock data
    const recentUploads = [
        { id: 1, name: 'Lecture_Notes.pdf', type: 'text', date: '2 mins ago', status: 'Completed', result: 'Tamil' },
        { id: 2, name: 'Site_Photo.jpg', type: 'image', date: '1 hour ago', status: 'Completed', result: 'Extracted Text' },
        { id: 3, name: 'Seminar_Audio.mp3', type: 'audio', date: 'Yesterday', status: 'Failed', result: '-' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">My Dashboard</h2>
                    <p className="text-gray-400">Overview of your learning materials</p>
                </div>
                <Link
                    to="/file-type"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg transition-all"
                >
                    <Plus size={20} />
                    New Conversion
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Conversions', val: '24', color: 'from-blue-600 to-blue-400' },
                    { label: 'Saved Hours', val: '12.5', color: 'from-purple-600 to-purple-400' },
                    { label: 'Languages Used', val: '4', color: 'from-emerald-600 to-emerald-400' }
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-gray-800 border border-gray-700 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                        <h3 className="text-gray-400 font-medium mb-1">{stat.label}</h3>
                        <p className="text-4xl font-bold text-white">{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                    <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                </div>
                <div className="divide-y divide-gray-700">
                    {recentUploads.map((item) => (
                        <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gray-700 text-gray-300">
                                    {item.type === 'text' ? <FileText /> : item.type === 'image' ? <Image /> : <Mic />}
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">{item.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <Clock size={14} />
                                        <span>{item.date}</span>
                                        <span>•</span>
                                        <span>{item.result}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.status === 'Completed'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
