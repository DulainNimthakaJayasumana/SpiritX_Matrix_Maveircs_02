import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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

  const calculateStats = () => {
    const battingStrikeRate = ((MOCK_PLAYER_DETAILS.totalRuns / MOCK_PLAYER_DETAILS.ballsFaced) * 100).toFixed(2);
    const battingAverage = (MOCK_PLAYER_DETAILS.totalRuns / MOCK_PLAYER_DETAILS.inningsPlayed).toFixed(2);
    const bowlingStrikeRate = ((MOCK_PLAYER_DETAILS.oversBowled * 6) / MOCK_PLAYER_DETAILS.wickets).toFixed(2);
    const economyRate = (MOCK_PLAYER_DETAILS.runsConceded / MOCK_PLAYER_DETAILS.oversBowled).toFixed(2);

    return {
      battingStrikeRate,
      battingAverage,
      bowlingStrikeRate,
      economyRate,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-[#003049]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate('/users')}
            className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#003049]" />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-[#FF6B6B] rounded-full w-16 h-16 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces"
                alt={MOCK_PLAYER_DETAILS.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold text-white">Player {id} Details</h1>
          </div>
        </div>

        <div className="bg-[#005F89] rounded-3xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-white opacity-80 mb-2">University</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.university}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Category</h3>
              <p className="text-2xl text-white">Type {MOCK_PLAYER_DETAILS.category}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Total Runs</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.totalRuns}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Balls Faced</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.ballsFaced}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Innings Played</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.inningsPlayed}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Wickets</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.wickets}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Overs Bowled</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.oversBowled}</p>
            </div>
            <div>
              <h3 className="text-white opacity-80 mb-2">Runs Conceded</h3>
              <p className="text-2xl text-white">{MOCK_PLAYER_DETAILS.runsConceded}</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Batting Strike Rate</h3>
                <p className="text-3xl text-white">{stats.battingStrikeRate}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Batting Average</h3>
                <p className="text-3xl text-white">{stats.battingAverage}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Bowling Strike Rate</h3>
                <p className="text-3xl text-white">{stats.bowlingStrikeRate}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Economy Rate</h3>
                <p className="text-3xl text-white">{stats.economyRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;