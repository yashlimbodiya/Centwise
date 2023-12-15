import React, {useState} from "react";
import styles from "./InviteFriendsModal.module.css";
import axios from 'axios';

interface InviteFriendsModalProps {
  closeModal: (param: boolean) => void;
}

function InviteFriendsModal({ closeModal }: { closeModal: (param: boolean) => void }){

    const [email, setEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setEmail(inputValue);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputValue);
        setIsValidEmail(isValid);
      };

      const handleSendInvite = async () => {
        if (isValidEmail) {
          try {
            const response = await axios.post('/api/user/inviteFriend', {
              email: email,
            });
            console.log(response);
            //alert('Password reset email sent. Check your inbox.');
            closeModal(false);
          } catch (error) {
            console.error('Error sending password reset email:', error);
          }
          // Perform invite logic here
          console.log('Sending invite to:', email);
          // You can add your logic to send the invite here
        } else {
          // Display an error message or handle invalid input
          alert('Please enter a valid email address');
        }
      };

    return (
        <>

       <div className={styles.overlay}></div>
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                <button onClick={() => closeModal(false)}> + </button>
                </div>
                <div className={styles.title}>
                </div>
                <div className={styles.heading}><p>Invite Friends:</p>
                </div>
                <div className={styles.body}> 
                <input className={styles.email}
                 value={email} 
                 onChange={handleChange}
                 type="email"
                 placeholder="Enter email id"
                 required id="email"
                 />
                </div>
                <div className={styles.footer}>
                <button onClick={handleSendInvite}>Send Invite</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default InviteFriendsModal;