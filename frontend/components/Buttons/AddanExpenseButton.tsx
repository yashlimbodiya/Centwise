import { useState } from "react";
import styles from "./AddAnExpenseButton.module.css";
import { useTranslation } from 'react-i18next';
import AddExpense from "../AddExpense/AddExpense";


function addAnExpenseButton() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    //closeSecondModal();
  };
 
  const { t } = useTranslation('common');
  return (
    <>
      <button className={styles.addExpenseBtn} onClick={toggleModal}>{t('add.expense.button.label')}</button>
      {modal && <AddExpense/>}
    </>
  );
}

export default addAnExpenseButton;
