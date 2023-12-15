
import React,{useEffect}from "react";
import styles from "./Settleup.module.css";

interface RecipientListModalProps {
  onClose: () => void;
}

const RecipientListModal: React.FC<RecipientListModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(`.${styles.userListModal}`)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className={styles.recipientListModal}>
      <h2>Choose a recipient</h2>
      <hr/>
      
      <button className={styles.closeRecipientListModal} onClick={onClose}>
       X
      </button>
    </div>
  );
};

export default RecipientListModal;
