import React from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Button from "../Button/Button";
import styles from "./Winner.module.scss";

interface IProps {
  winner: string;
  onRestart: () => void;
  onClose: () => void;
}

const Winner: React.FC<IProps> = ({ winner, onRestart, onClose }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  return (
    <div ref={modalRef} className={styles.modal}>
      <h2 className={styles.title}>Поздравляем!</h2>
      <p>Победитель - {winner}!</p>
      <Button onClick={onRestart}>Рестарт</Button>
    </div>
  );
};

export default Winner;
