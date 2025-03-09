import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-[#003049]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate('/user')}
            className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#003049]" />
          </button>
          <h1 className="text-5xl font-bold text-white">User List</h1>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {MOCK_PLAYERS.map((player) => (
            <button
              key={player.id}
              onClick={() => navigate(`/player/${player.id}`)}
              className="w-full bg-[#005F89] hover:bg-[#0077B6] transition-colors rounded-full py-4 px-6 flex items-center gap-4"
            >
              <div className="bg-[#FF6B6B] rounded-full w-12 h-12 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=48&h=48&fit=crop&crop=faces"
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <span className="text-2xl font-semibold text-white">{player.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;