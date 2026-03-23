import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import LanguagePreference from './pages/LanguagePreference'
import FileTypeSelection from './pages/FileTypeSelection'
import FileUpload from './pages/FileUpload'
import ConversionType from './pages/ConversionType'
import Processing from './pages/Processing'
import Result from './pages/Result'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/preference" element={<LanguagePreference />} />
                <Route path="/file-type" element={<FileTypeSelection />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/conversion-type" element={<ConversionType />} />
                <Route path="/processing" element={<Processing />} />
                <Route path="/result" element={<Result />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
