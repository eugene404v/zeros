import {
  directionalStepsDict,
  DirectionsKeys,
  summingDirectionsDict,
} from "../constants/directions";
import { Field } from "../types/Field";
import { ComposedPlayersType, PlayersEnum } from "../types/Players";

interface ILastUpdate {
  x: number;
  y: number;
  player: PlayersEnum;
}

export const checkWinner = (
  field: Field,
  lastUpdate: ILastUpdate,
  requiredForWin: number = 3
) => {
  const { player, x: lastUpdatedX, y: lastUpdatedY } = lastUpdate;
  let winner: ComposedPlayersType = null;
  const directionalsDict = {
    n: 0,
    ne: 0,
    e: 0,
    se: 0,
    s: 0,
    sw: 0,
    w: 0,
    nw: 0,
  };

  const checkDirection = (direction: DirectionsKeys, x: number, y: number) => {
    const [stepX, stepY] = directionalStepsDict[direction];
    const targetX = x + stepX;
    const targetY = y + stepY;
    if (field[targetY]?.[targetX] === player) {
      directionalsDict[direction]++;
      checkDirection(direction, targetX, targetY);
    } else {
      return;
    }
  };

  let dirKey: DirectionsKeys;
  for (dirKey in directionalsDict) {
    checkDirection(dirKey, lastUpdatedX, lastUpdatedY);
  }

  let sumKey: keyof typeof summingDirectionsDict;
  for (sumKey in summingDirectionsDict) {
    const opposingDirectionKey = summingDirectionsDict[
      sumKey
    ] as DirectionsKeys;
    const sum =
      1 + directionalsDict[sumKey] + directionalsDict[opposingDirectionKey];
    if (sum >= requiredForWin) {
      winner = player;
    }
  }

  return winner;
};
