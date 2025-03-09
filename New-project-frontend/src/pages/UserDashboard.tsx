import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, MessageCircle, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">User Dashboard</h1>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate('/users')}
          >
            <Users className="w-12 h-12 text-blue-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">User List</h2>
          </button>
          
          <div className="bg-white p-6 rounded-xl shadow-lg relative">
            <MessageCircle className="w-12 h-12 text-blue-900 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Chat Bot</h2>
            <div className="absolute bottom-4 right-4">
              <button className="bg-blue-900 text-white p-2 rounded-full">
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;