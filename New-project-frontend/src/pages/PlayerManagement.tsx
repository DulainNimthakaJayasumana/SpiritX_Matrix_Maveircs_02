import React, { useState } from 'react';
import PlayerList from './PlayerList';
import PlayerEditModal from './PlayerEditModal';
import PlayerAddModal from './PlayerAddModal';
import { Player, PlayerEditFormData } from '../types/player';

// Mock data - replace with actual API calls
const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'John Smith',
    university: 'University A',
    category: 'Batsman',
    stats: {
      totalRuns: 450,
      ballsFaced: 600,
      inningsPlayed: 15,
      wickets: 5,
      oversBowled: 30,
      runsConceded: 200
    }
  },
  // Add more mock players here
];

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleSave = (playerId: string, data: PlayerEditFormData) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, ...data }
          : player
      )
    );
    setEditingPlayer(null);
  };

  const handleDelete = (playerIds: string[]) => {
    setPlayers(prevPlayers =>
      prevPlayers.filter(player => !playerIds.includes(player.id))
    );
  };

  const handleAdd = (data: PlayerEditFormData & { name: string }) => {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      ...data
    };
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
    setIsAddingPlayer(false);
  };

  return (
    <div className="min-h-screen bg-[#001B2E]">
      <PlayerList
        players={players}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={() => setIsAddingPlayer(true)}
      />
      {editingPlayer && (
        <PlayerEditModal
          player={editingPlayer}
          onClose={() => setEditingPlayer(null)}
          onSave={handleSave}
        />
      )}
      {isAddingPlayer && (
        <PlayerAddModal
          onClose={() => setIsAddingPlayer(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}