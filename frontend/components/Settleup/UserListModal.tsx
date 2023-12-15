// UserListModal.tsx

import React, { useEffect } from "react";
import styles from "./Settleup.module.css";

interface UserListModalProps {
  onClose: () => void;
}

const UserListModal: React.FC<UserListModalProps> = ({ onClose }) => {
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
    <div className={`${styles.userListModal} ${styles.active}`}>
      <h2>Choose Payer</h2>
      <hr></hr>
      <button className={styles.closeUserListModal} onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default UserListModal;
