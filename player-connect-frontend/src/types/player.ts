export interface Player {
  id: string;
  name: string;
  university: string;
  category: string;
  stats: {
    totalRuns: number;
    ballsFaced: number;
    inningsPlayed: number;
    wickets: number;
    oversBowled: number;
    runsConceded: number;
  };
}

export interface PlayerEditFormData extends Omit<Player, 'id' | 'name'> {}