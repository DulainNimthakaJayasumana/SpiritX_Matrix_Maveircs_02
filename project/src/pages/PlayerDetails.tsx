import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const MOCK_PLAYER_DETAILS = {
  id: 2,
  name: 'Player 2',
  university: 'Stanford',
  category: 'B',
  totalRuns: 450,
  ballsFaced: 600,
  inningsPlayed: 15,
  wickets: 20,
  oversBowled: 80,
  runsConceded: 320,
};

const PlayerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/users')}
            className="mr-4 text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-4">
              <User className="w-8 h-8 text-blue-900" />
            </div>
            <h1 className="text-4xl font-bold text-white">Player Details</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-gray-600">University</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.university}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Category</h3>
              <p className="text-xl font-semibold">Type {MOCK_PLAYER_DETAILS.category}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Total Runs</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.totalRuns}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Balls Faced</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.ballsFaced}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Innings Played</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.inningsPlayed}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Wickets</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.wickets}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Overs Bowled</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.oversBowled}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Runs Conceded</h3>
              <p className="text-xl font-semibold">{MOCK_PLAYER_DETAILS.runsConceded}</p>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-2">Batting Strike Rate</h3>
                <p className="text-xl font-semibold">
                  {((MOCK_PLAYER_DETAILS.totalRuns / MOCK_PLAYER_DETAILS.ballsFaced) * 100).toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-2">Batting Average</h3>
                <p className="text-xl font-semibold">
                  {(MOCK_PLAYER_DETAILS.totalRuns / MOCK_PLAYER_DETAILS.inningsPlayed).toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-2">Bowling Strike Rate</h3>
                <p className="text-xl font-semibold">
                  {((MOCK_PLAYER_DETAILS.oversBowled * 6) / MOCK_PLAYER_DETAILS.wickets).toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600 mb-2">Economy Rate</h3>
                <p className="text-xl font-semibold">
                  {(MOCK_PLAYER_DETAILS.runsConceded / MOCK_PLAYER_DETAILS.oversBowled).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;