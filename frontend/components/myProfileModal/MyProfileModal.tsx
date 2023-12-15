import React, { useState, useEffect } from "react";
import styles from './MyProfileModal.module.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { Document } from 'mongoose';
import userIcon from "../../../public/images/userIcon.png";

interface UserData extends Document {
  _id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  ph_no: string;
  created_date: Date;
  totalOweAmount: number;
  totalOweToSelf: number;
  totalBalance: number;
  profilePicture: string;
}

function MyProfileModal({ closeModal }: { closeModal: (flag: boolean) => void }) {
  let initial_first_name = '';
  let initial_last_name = '';
  let initial_email = '';
  let initial_ph_no = '';
  let [userData, setUserData] = useState<UserData | null>(null);
  let [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard/userDetails');
        const data = response.data;
        setUserData(data);
        setProfilePicture(data.profilePicture);
      } catch (error: any) {
        console.error('Error getting data from the database:', error.message);
      }
    };

    fetchData();
    initial_first_name = userData?.first_name || '';
    initial_last_name = userData?.last_name || '';
    initial_email = userData?.email || '';
    initial_ph_no = userData?.ph_no || '';
  }, []);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editModeProfilePicture, setEditModeProfilePicture] = useState(false);

  const handleSave = async () => {
    try {
      const [firstName, lastName] = fullName.split(" ");
      if (firstName === '' || lastName === '' || email === '') {
        alert('Enter all of the values');
        return;
      } else if (!email.includes('@')) {
        alert('Enter correct email address');
        return;
      }
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        ph_no: phoneNumber,
        email: email,
        profilePicture: profilePicture,
      };
      const userId = userData?._id;
      const response = await axios.patch(`/api/dashboard/updateProfile/${userId}`, updatedData);
      //console.log('PATCH request successful:', response.data);
      setUserData(response.data); // Update user data after a successful save
      setEditMode(false);
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    // Set initial values when entering edit mode
    setFullName(`${userData?.first_name} ${userData?.last_name}`);
    setEmail(userData?.email || '');
    setPhoneNumber(userData?.ph_no || '');
  };


  const handleEditClickProfilePicture = () => {
    setEditModeProfilePicture(true);
  };

  const handleSaveClick = () => {
    setEditModeProfilePicture(false);
  };

  const handleCancelClick = () => {
    // Reset fields to initial values
    setEditMode(false);
    setEditModeProfilePicture(false);
  };
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className={styles.overlay}></div>

      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => closeModal(false)}> x </button>
          </div>
          <div className={styles.title}>
          
          <div className={styles.imageContainer}>
  {editModeProfilePicture ? (
    <>
      <img className={styles.userImg} src={userIcon} alt="User" />
      <div className={styles.fileInputWrapper}>
        <input type="file" className={styles.choosefile}onChange={(e) => handleProfilePictureChange(e)} />
        <button onClick={handleSaveClick} className={styles.saveButton}>Save</button>
        <button onClick={handleCancelClick} className={styles.profilecancel}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <img className={styles.userImg} src={userIcon} alt="User" />
      <ModeEditIcon onClick={handleEditClickProfilePicture} className={styles.editIcon}/>
    </>
  )}
</div>
          </div>
          <div className={styles.heading}>
            <p>Your Details:</p>
          </div>
          <div className={styles.body}>
            <div className={styles.name}>
              <p>
                Name: {editMode ? (
                  <span className={styles.editInputContainer}>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.editInput} />
                  </span>
                ) : (
                  <>
                    {`${userData?.first_name}`} {` ${userData?.last_name}`}
                  </>
                )}
              </p>
            </div>

            <div className={styles.email}>
              <p>
                Email: {editMode ? (
                  <span className={styles.editInputContainer}>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.editInput} />
                  </span>
                ) : (
                  <>
                    {`${userData?.email}`}
                  </>
                )}
              </p>
            </div>

            <div className={styles.phone}>
              <p>
                Phone: {editMode ? (
                  <span className={styles.editInputContainer}>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={styles.editInput} />
                  </span>
                ) : (
                  <>
                    {`${userData?.ph_no}`}
                  </>
                )}
              </p>
            </div>

            {editMode && (
              <div className={styles.editButtons}>
               <div> <button className={styles.save} onClick={handleSave}>Save</button>
                <button className={styles.cancel} onClick={handleCancelClick}>Cancel</button></div>
              </div>
            )}

            {!editMode && (
              <span className={styles.editIcon} onClick={handleEditClick}>
                <div><ModeEditIcon /> Edit</div>
              </span>
            )}
          </div>
          <div className={styles.footer}></div>
        </div>
      </div>
    </>
  );
}

export default MyProfileModal;
