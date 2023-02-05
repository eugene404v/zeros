import React from "react";
import Cell from "../../ui/Cell/Cell";
import styles from "./Game.module.scss";
import { useGame } from "./useGame";
import cn from "classnames";
import Select from "react-select";
import { requiredForWinOptions } from "../../constants/requiredForWin";
import Winner from "../../ui/Winner/Winner";
import Button from "../../ui/Button/Button";
import { playersArr } from "../../constants/players";

const Game = () => {
  const {
    field,
    clickCell,
    activePlayerIndex,
    winner,
    restart,
    changeRequiredCells,
    requiredCells,
  } = useGame();

  const requiredCellsSelectValue = React.useMemo(
    () => ({
      label: String(requiredCells),
      value: requiredCells,
    }),
    [requiredCells]
  );

  const [isWinnerModal, setIsWinnerModal] = React.useState(false);

  React.useEffect(() => {
    if (!!winner) {
      setIsWinnerModal(true);
    }
  }, [winner]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <span>Количество ячеек для выигрыша</span>
        <Select
          value={requiredCellsSelectValue}
          options={requiredForWinOptions}
          onChange={changeRequiredCells}
          className={styles.select}
        />
      </div>
      <div className={styles.currentPlayer}>
        Сейчас ходит: {playersArr[activePlayerIndex]}
      </div>
      <div className={cn(styles.grid, { [styles.disabled]: !!winner })}>
        {field.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              checkedBy={cell}
              x={x}
              y={y}
              key={String(x) + String(y)}
              onClick={clickCell}
              activePlayerIndex={activePlayerIndex}
            />
          ))
        )}
      </div>
      <Button onClick={restart}>Рестарт</Button>
      {!!winner && isWinnerModal && (
        <Winner
          winner={winner}
          onRestart={restart}
          onClose={() => setIsWinnerModal(false)}
        />
      )}
    </div>
  );
};

export default Game;
