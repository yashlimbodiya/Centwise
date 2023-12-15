// EqualModal.tsx
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../AddExpense/AddExpense.module.css";

interface SelectSplitMethodProps {
  onClose: () => void;
  onClick: (method: string) => void;
}

const SelectSplitMethod: FC<SelectSplitMethodProps> = (props) => {
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

  const [splitMethod, setSplitMethod] = useState("Equal");

  const equalMethodSelected = () => {
    setSplitMethod("Equal");
  };

  const customMethodSelected = () => {
    setSplitMethod("Custom");
    
  };

  const handleSave = () => {
    props.onClick(splitMethod);
    props.onClose();
  }

  return (
    <div className={styles.EqualModal}>
      <div ref={modalContentRef} className={styles.modalContent}>
        <h2>Choose split options</h2>
        <hr />

        <div className={`${styles.row} ${styles.card_input}`}>
          <label className={styles.label}>
            <input type="radio" name="splitMethod" className={styles.card_input_element} onChange={equalMethodSelected}/>
            <span className={styles.panel_body}>
              Equally
            </span>
          </label>
        </div>
        <div className={`${styles.row} ${styles.card_input}`}>
          <label className={styles.label}>
            <input type="radio" name="splitMethod" className={styles.card_input_element} onChange={customMethodSelected}/>
            <span className={styles.panel_body}>
              Custom
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

export default SelectSplitMethod;
