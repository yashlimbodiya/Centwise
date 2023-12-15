import { useState } from "react";
import SettleupModal from "../Settleup/Settleup";
import styles from "./SettleUpButton.module.css";
import { useTranslation } from 'react-i18next';


function SettleUpButtonButton() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const { t } = useTranslation('common');

  return (
    <>
      <button className={styles.settleUpBtn}  onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}> {t('settle.up.button.label')} </button>
      {modal && <SettleupModal />}
    </>
  );
}
export default SettleUpButtonButton;
