import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const MOCK_PLAYERS = [
  { id: 1, name: 'Player 1', university: 'MIT', category: 'A' },
  { id: 2, name: 'Player 2', university: 'Stanford', category: 'B' },
  { id: 3, name: 'Player 3', university: 'Harvard', category: 'A' },
  { id: 4, name: 'Player 4', university: 'Yale', category: 'C' },
  { id: 5, name: 'Player 5', university: 'Princeton', category: 'B' },
  { id: 6, name: 'Player 6', university: 'Columbia', category: 'A' },
  { id: 7, name: 'Player 7', university: 'Cornell', category: 'C' },
  { id: 8, name: 'Player 8', university: 'Brown', category: 'B' },
];

const UserList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/user')}
            className="mr-4 text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold text-white">User List</h1>
        </div>
        
        <div className="space-y-4">
          {MOCK_PLAYERS.map((player) => (
            <button
              key={player.id}
              className="w-full bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center"
              onClick={() => navigate(`/player/${player.id}`)}
            >
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <User className="w-6 h-6 text-blue-900" />
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-lg font-semibold text-gray-900">{player.name}</h2>
                <p className="text-sm text-gray-600">
                  {player.university} - Category {player.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;