import React from "react";
import { playersArr } from "../../constants/players";
import { ComposedPlayersType, PlayersEnum } from "../../types/Players";
import { defaultField } from "../../constants/field";
import { checkWinner } from "../../utils/checkWinner";
import { SingleValue } from "react-select";

export const useGame = () => {
  const [field, setField] = React.useState(defaultField);

  const [activePlayerIndex, setActivePlayerIndex] = React.useState(0);

  const [requiredCells, setRequiredCells] = React.useState(3);

  const [winner, setWinner] = React.useState<ComposedPlayersType>(null);

  const changeActivePlayer = React.useCallback(() => {
    setActivePlayerIndex((prev) => {
      if (!!playersArr[prev + 1]) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }, []);

  const clickCell = React.useCallback(
    (x: number, y: number, player: PlayersEnum) => {
      changeActivePlayer();
      setField((prev) => {
        return prev.map((row, i) => {
          if (i === y) {
            return row.map((cell, cellIndex) => {
              if (cellIndex === x) {
                return player;
              } else {
                return cell;
              }
            });
          } else return row;
        });
      });
      const winner = checkWinner(field, { x, y, player }, requiredCells);
      setWinner(winner);
    },
    [changeActivePlayer, field, requiredCells]
  );

  const restart = React.useCallback(() => {
    setWinner(null);
    setField(defaultField);
    setActivePlayerIndex(0);
  }, []);

  const changeRequiredCells = React.useCallback(
    (
      v: SingleValue<{
        value: number;
        label: string;
      }>
    ) => {
      if (v) {
        setRequiredCells(v?.value);
      }
    },
    []
  );

  return {
    field,
    clickCell,
    activePlayerIndex,
    winner,
    restart,
    requiredCells,
    changeRequiredCells,
  };
};
