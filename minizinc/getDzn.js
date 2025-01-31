import allPlayers from '../data/players';
import { getPlayerScore, positionToInt } from './params';

const MAX_PER_TEAM = 3;

const getDzn = () => {
  const players = allPlayers.filter((p) => getPlayerScore(p) !== undefined);
  //const players = players1.filter((p) => p.cost <= 6500000); // No star
  const squadIds = Array.from(
    players.reduce((squads, p) => {
      squads.add(p.squadId);
      return squads;
    }, new Set([]))
  );
  const data = `Players = {${players.map((p) => `'${p.id}'`)}};
  cost = [${players.map((p) => p.cost / 100000)}];
  value = [${players.map((p) => getPlayerScore(p) || 0)}];
  position = [${players.map(positionToInt)}];
  squad = [${players.map((p) => p.squadId)}];
  squadIds = [${squadIds}];
  lbound = [${squadIds.map(() => 0)}];
  ubound = [${squadIds.map(() => MAX_PER_TEAM)}];
  `;
  return data;
};

export default getDzn;
