import React, { useState } from 'react';
import { Check, Edit2, Trash2, ArrowLeft, UserPlus } from 'lucide-react';
import { Player } from '../types/player';

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (playerIds: string[]) => void;
  onAdd: () => void;
}

export default function PlayerList({ players, onEdit, onDelete, onAdd }: PlayerListProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());

  const toggleSelection = (playerId: string) => {
    const newSelection = new Set(selectedPlayers);
    if (newSelection.has(playerId)) {
      newSelection.delete(playerId);
    } else {
      newSelection.add(playerId);
    }
    setSelectedPlayers(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedPlayers.size === players.length) {
      setSelectedPlayers(new Set());
    } else {
      setSelectedPlayers(new Set(players.map(p => p.id)));
    }
  };

  const handleDelete = () => {
    onDelete(Array.from(selectedPlayers));
    setSelectedPlayers(new Set());
    setIsSelectionMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-center text-white">Admin List</h1>
        <div className="flex gap-2">
          {!isSelectionMode && (
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add Player
            </button>
          )}
          {isSelectionMode ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsSelectionMode(false);
                  setSelectedPlayers(new Set());
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              {selectedPlayers.size > 0 && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete ({selectedPlayers.size})
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsSelectionMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Select
            </button>
          )}
        </div>
      </div>

      {isSelectionMode && (
        <div 
          className="flex items-center mb-4 p-3 bg-gray-800 rounded-lg cursor-pointer"
          onClick={toggleSelectAll}
        >
          <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center
            ${selectedPlayers.size === players.length ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}
          >
            {selectedPlayers.size === players.length && <Check className="w-4 h-4 text-white" />}
          </div>
          <span className="text-white">Select All</span>
        </div>
      )}

      <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center bg-[#0B4F6C] p-4 rounded-lg text-white"
          >
            {isSelectionMode && (
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center cursor-pointer
                  ${selectedPlayers.has(player.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}
                onClick={() => toggleSelection(player.id)}
              >
                {selectedPlayers.has(player.id) && <Check className="w-4 h-4 text-white" />}
              </div>
            )}
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.id}`}
              alt={player.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <span className="flex-grow text-lg">{player.name}</span>
            {!isSelectionMode && (
              <button
                onClick={() => onEdit(player)}
                className="px-4 py-2 bg-[#BB86FC] text-white rounded-lg hover:bg-opacity-80"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}