// SettleupModal.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./Settleup.module.css";
import RecordCashModal from "./RecordCashModal";

export default function SettleupModal() {
  const [modal, setModal] = useState(true);
  const [showRecordCashModal, setShowRecordCashModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleRecordCashModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowRecordCashModal(!showRecordCashModal);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      modalRef.current &&
      !target.closest(`.${styles.modalContent}`) &&
      !target.closest(`.${styles.recordCashModalContent}`)
    ) {
      setModal(false);
      setShowRecordCashModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (modal || showRecordCashModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>


      {(modal || showRecordCashModal) && (
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <h2>Settle Up</h2>
            <hr className={styles.hr}></hr>
            <p className={styles.choose}>Choose a payment method</p>

            <button className={styles.payment} onClick={(e) => toggleRecordCashModal(e)}>
              Record a cash payment
            </button>
            <button className={styles.closeModal} onClick={toggleModal}>
              X
            </button>
            <br />
            <p className={styles.disclaimer}>
              When you use a payment service, your payment is shared with that
              company under its Privacy Policy and Terms, including any fees if
              applicable. Centwise charges no additional fees.
            </p>

            <button className={styles.cancel} onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showRecordCashModal && <RecordCashModal onClose={() => setShowRecordCashModal(false)} />}
    </>
  );
}
