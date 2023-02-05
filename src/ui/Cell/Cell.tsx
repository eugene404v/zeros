import React from "react";
import { playersArr } from "../../constants/players";
import { PlayersEnum } from "../../types/Players";
import styles from "./Cell.module.scss";

interface IProps {
  x: number;
  y: number;
  onClick: (x: number, y: number, player: PlayersEnum) => void;
  checkedBy: PlayersEnum | null;
  activePlayerIndex: number;
}

const Cell: React.FC<IProps> = ({
  x,
  y,
  onClick,
  checkedBy = null,
  activePlayerIndex,
}) => {
  const clickHandler = () => {
    if (!!checkedBy) return;
    onClick(x, y, playersArr[activePlayerIndex]);
  };

  return (
    <div className={styles.cell} onClick={clickHandler}>
      {checkedBy === PlayersEnum.cross && "X"}
      {checkedBy === PlayersEnum.zero && "O"}
    </div>
  );
};

export default React.memo(Cell);
