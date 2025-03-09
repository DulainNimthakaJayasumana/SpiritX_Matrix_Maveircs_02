import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trophy, Users, Activity, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {/* Add tournament summary logic */}}
          >
            <Trophy className="w-12 h-12 text-blue-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Tournament Summary</h2>
          </button>
          
          <button
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {/* Add player stats logic */}}
          >
            <Activity className="w-12 h-12 text-blue-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Player Stats</h2>
          </button>
          
          <button
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {/* Add admin list logic */}}
          >
            <Users className="w-12 h-12 text-blue-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Admin List</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;