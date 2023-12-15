import React, { useState, useRef, ChangeEvent } from 'react';
// import styles from './ForgotPassModal.module.css';
import styles from "../../AddCentwiseFriend/AddCentwiseFriend.module.css";
import axios from 'axios';

interface ModalProps {
  closeModal: () => void;
}

const ForgotPassModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');

  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Add your logic to handle the email submission here
    console.log('Email submitted:', email);
    closeModal();
  };

  const handleFormSubmit = () => {
    if(email === ""){
        alert("Email address cannot be empty");
    }else{
        sendEmail(email);   
    }
}

const sendEmail = async (email:string) => {
  try {
    // Make a request to your server to create the group
    const response = await axios.post('/api/user/forgotPassword',
      {
        email: email,
      },
    );
      alert("Email sent successfully.");
  } catch (error: any) { 
    // Handle errors, e.g., log them or show an error message to the user
    alert(error);
  }
}

  return (
    // <div className={styles.modalOverlay}>
    //   <div className={styles.modalContent}>
    //     <div className={styles.modalHeader}>
    //       <h2>Enter Email</h2>
    //     </div>
    //     <div className={styles.modalBody}>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={handleEmailChange}
    //         placeholder="Enter your email"
    //       />
    //     </div>
    //     <div className={styles.modalFooter}>
          
    //       <button onClick={handleSubmit as React.MouseEventHandler}>Submit</button>
    //       <button onClick={closeModal}>Cancel</button>
    //     </div>
    //   </div>
    // </div>

    <div ref={modalContentRef} className={styles.modal}>
    <div onClick={closeModal} className={styles.overlay}></div>
    <div className={styles.modalContent}>
        <h3 className={styles.formHeading}>Reset Password</h3>
        <form onSubmit={handleFormSubmit}>
            <input
                className={styles.inputs}
                type="text"
                value={email}
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.add}>
                    Send Link 
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className={styles.cancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>
  );
};

export default ForgotPassModal;
