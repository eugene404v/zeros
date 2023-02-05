import React from "react";
import styles from "./Button.module.scss";

interface IProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
