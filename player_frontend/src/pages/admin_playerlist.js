import React, { useState, useEffect } from 'react';

/** 
 * Mock function to simulate fetching players from a backend.
 * Replace with real API call in production.
 */
async function fetchPlayers() {
  // Example data structure. In real code, you'd fetch from an API endpoint.
  return [
    {
      id: 1,
      name: 'Player 1',
      university: 'University A',
      category: 'Category A',
      totalRuns: 100,
      ballsFaced: 80,
      inningsPlayed: 5,
      wickets: 2,
      oversBowled: 10,
      runsConceded: 50,
    },
    {
      id: 2,
      name: 'Player 2',
      university: 'University B',
      category: 'Category B',
      totalRuns: 150,
      ballsFaced: 120,
      inningsPlayed: 7,
      wickets: 3,
      oversBowled: 14,
      runsConceded: 70,
    },
    
  ];
}

/** 
 * Mock function to simulate updating a player's stats in the backend.
 * Replace with real API call in production.
 */
async function updatePlayer(updatedPlayer) {
  return updatedPlayer;
}

/** 
 * Mock function to simulate deleting multiple players in the backend.
 * Replace with real API call in production.
 */
async function deletePlayers(playerIds) {
  return playerIds;
}

function AdminPlayerList() {
  const [players, setPlayers] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false); 
  const [selectedPlayers, setSelectedPlayers] = useState([]); 
  const [editPlayer, setEditPlayer] = useState(null);  

  // Fetch players on initial load
  useEffect(() => {
    fetchPlayers().then(data => setPlayers(data));
  }, []);

  // Toggle selection mode
  const handleSelectClick = () => {
    setIsSelecting(!isSelecting);
    setSelectedPlayers([]); // Clear any previously selected players
  };

  // Select or deselect all players
  const handleSelectAll = (checked) => {
    if (checked) {
      // Select all players
      setSelectedPlayers(players.map(p => p.id));
    } else {
      // Deselect all players
      setSelectedPlayers([]);
    }
  };

  // Select or deselect an individual player
  const handlePlayerSelect = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      // Remove player from selection
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      // Add player to selection
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  // Delete all selected players
  const handleDeleteSelected = async () => {
    if (selectedPlayers.length === 0) return;
    await deletePlayers(selectedPlayers);

    // Remove deleted players from local state
    setPlayers(players.filter(p => !selectedPlayers.includes(p.id)));
    setSelectedPlayers([]);
  };

  // Begin editing a single player
  const handleEditClick = (player) => {
    setEditPlayer(player);
  };

  // Handle confirming the edit for a player
  const handleUpdatePlayer = async (updatedPlayer) => {
    const result = await updatePlayer(updatedPlayer);
    // Update local state to reflect changes
    setPlayers(players.map(p => (p.id === result.id ? result : p)));
    setEditPlayer(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditPlayer(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Admin List</h2>
      <div style={{ marginBottom: '10px' }}>
        {/* Select / Cancel button */}
        <button onClick={handleSelectClick}>
          {isSelecting ? 'Cancel' : 'Select'}
        </button>

        {/* Delete button appears only in selection mode */}
        {isSelecting && (
          <button 
            onClick={handleDeleteSelected} 
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        )}

        {/* "Select All" circle appears only in selection mode */}
        {isSelecting && (
          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              // If every player is selected, the checkbox is checked
              checked={
                selectedPlayers.length === players.length && players.length > 0
              }
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            Select All
          </label>
        )}
      </div>

      {/* Scrollable player list */}
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px'
        }}
      >
        {players.map(player => {
          const isChecked = selectedPlayers.includes(player.id);

          return (
            <div 
              key={player.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '5px' 
              }}
            >
              {/* Show a circle checkbox in selection mode */}
              {isSelecting && (
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handlePlayerSelect(player.id)}
                  style={{ marginRight: '10px' }}
                />
              )}

              {/* Player name */}
              <span style={{ flexGrow: 1 }}>{player.name}</span>

              {/* Edit button (hidden if in selection mode) */}
              {!isSelecting && (
                <button 
                  onClick={() => handleEditClick(player)} 
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </button>
              )}

              {/* Example "button #1" placeholder from your mockup */}
              {/* <button>button #1</button> */}
            </div>
          );
        })}
      </div>

      {/* Show the editing box if a player is being edited */}
      {editPlayer && (
        <PlayerEdit
          player={editPlayer}
          onUpdate={handleUpdatePlayer}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

/**
 * Component for editing a single player's stats.
 * Renders a small form with relevant fields and 
 * a "Confirm Details" button to save the changes.
 */
function PlayerEdit({ player, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...player });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    // Pass the updated data back to the parent
    onUpdate(formData);
  };

  return (
    <div 
      style={{ 
        marginTop: '20px', 
        border: '1px solid #ccc', 
        padding: '10px',
        borderRadius: '4px'
      }}
    >
      <h3>Editing {player.name} Details</h3>
      <div>
        <label>University: </label>
        <input
          name="university"
          value={formData.university || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category: </label>
        <input
          name="category"
          value={formData.category || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Runs: </label>
        <input
          name="totalRuns"
          value={formData.totalRuns || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Balls Faced: </label>
        <input
          name="ballsFaced"
          value={formData.ballsFaced || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Innings Played: </label>
        <input
          name="inningsPlayed"
          value={formData.inningsPlayed || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Wickets: </label>
        <input
          name="wickets"
          value={formData.wickets || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Overs Bowled: </label>
        <input
          name="oversBowled"
          value={formData.oversBowled || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Runs Conceded: </label>
        <input
          name="runsConceded"
          value={formData.runsConceded || ''}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleConfirm} style={{ marginRight: '10px' }}>
          After this edit and Confirm Details
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AdminPlayerList;
