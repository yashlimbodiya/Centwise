import { useRef, useState } from "react";
import styles from "./AddCentwiseFriend.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//Component to add existing centwise user 
const AddedCentwiseFriend: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState(true);
    const navigate = useNavigate();

    const modalContentRef = useRef<HTMLDivElement>(null);


    const handleFormSubmit = () => {
        if(email === ''){
            alert("Add Friend's email address");
        }else{
            addFriend(email);   
        }
    }

    const handleClose = () => {
        setModal(false);

    };

    const toggleModal = () => {
        setModal(!modal);
    }

    const addFriend = async (email: string) => {
        try {
          // Make a request to your server to create the group
          const response = await axios.post('/api/friends/addFriend',
            {
              email: email,
            },
          );

          console.log("add friend tsx");
          console.log(response);
          navigate('/friends');
    
          // Log the response or handle it as needed
          console.log('Group creation response:', response.data);
        } catch (error: any) { 
          // Handle errors, e.g., log them or show an error message to the user
          console.error('Error creating group:', error.message);
        }
      };



    return (

        <>
            {modal && (
                <div ref={modalContentRef} className={styles.modal}>
                    <div onClick={handleClose} className={styles.overlay}></div>
                    <div className={styles.modalContent}>
                        <h3 className={styles.formHeading}>Add Friend</h3>
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
                                    Add Friend 
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className={styles.cancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}</>

    );
}

export default AddedCentwiseFriend;