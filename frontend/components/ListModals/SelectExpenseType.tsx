// EqualModal.tsx
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../AddExpense/AddExpense.module.css";

interface SelectExpenseTypeProps {
  onClose: () => void;
  onClick: (method: string) => void;
}

const SelectExpenseType: FC<SelectExpenseTypeProps> = (props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Close the modal if clicked outside its content
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(target)
      ) {
        props.onClose();
      }
    };


    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [props.onClose]);

  const [ExpenseType, setExpenseType] = useState("Individual");

  const individualTypeSelected = () => {
    setExpenseType("Individual");
  };

  const groupTypeSelected = () => {
    setExpenseType("Group");
    
  };

  const handleSave = () => {
    props.onClick(ExpenseType);
    props.onClose();
  }

  return (
    <div className={styles.EqualModal}>
      <div ref={modalContentRef} className={styles.modalContent}>
        <h2>Choose Expense Type</h2>
        <hr />

        <div className={`${styles.row} ${styles.card_input}`}>
          <label className={styles.label}>
            <input type="radio" name="expenseType" className={styles.card_input_element} onChange={individualTypeSelected}/>
            <span className={styles.panel_body}>
              Individual
            </span>
          </label>
        </div>
        <div className={`${styles.row} ${styles.card_input}`}>
          <label className={styles.label}>
            <input type="radio" name="expenseType" className={styles.card_input_element} onChange={groupTypeSelected}/>
            <span className={styles.panel_body}>
              Group
            </span>
          </label>
        </div>
        <button type="submit" className={styles.save} onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={props.onClose} className={styles.cancelEqual}>
          X
        </button>
      </div>
    </div>
  );
};

export default SelectExpenseType;
