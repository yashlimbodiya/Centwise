import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import centwiseLogoPath from "../../../public/images/CentwiseLogo.png";
import AddAnExpenseButton from "../Buttons/AddanExpenseButton";
import SettleUpButton from "../Buttons/SettleUpButton";
import DropDownProfile from '../DropDownProfile/DropDownProfile';
import userData from "./navbarUserData.json";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Document, Types } from 'mongoose';
import userPhotoPath from "../../../public/images/userIcon.png";


interface Friend {
    friend: {
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
      friends: Friend[];
      expenses: Expense[];
    };
    amountInDeal: number;
  }

  interface Participant {
    _id: Types.ObjectId;
  }

  interface Expense {
    _id: string,
    Payer: Types.ObjectId;
    participants: Participant[];
    amount: number;
    currency: string;
    created_by: Types.ObjectId;
    created_date: Date;
    partition: string[];
  }

  interface UserData extends Document {
    _id: string,
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    ph_no: string;
    created_date: Date;
    totalOweAmount: number;
    totalOweToSelf: number;
    totalBalance: number;
    friends: Friend[];
    expenses: Expense[];
  }

function Navbar() {


  const { t } = useTranslation('common');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState({
    username: '',
    profilePicture: ''
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard/userDetails');
        const data = response.data;
        setUserData(data);
      } catch (error: any) {
        console.error('Error getting data from the database:', error.message);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    
    <>

      <nav className={styles.nav}>
        <a href="#">
          <img className={styles.centwiseLogo} src={centwiseLogoPath} ></img>
        </a>
        <div className={styles.navContainer}>
          <ul className={styles.navbar}>
            <li className={styles.navBarList}>
              <div className={styles.buttons}>  
              <AddAnExpenseButton />           
              <SettleUpButton />  
              </div>
              <p className={styles.verticalLine}></p>
              <div className={styles.userContainer}>
                <img className={styles.userProfile} src={userPhotoPath} alt="User Profile img" onClick={toggleDropdown} />
                <p className={styles.userName} onClick={toggleDropdown}>
                {`${userData?.first_name}`} {` ${userData?.last_name}`}</p>
                {/* </div> */}
                {dropdownVisible && (
                  <div className={styles.dropdownMenu}>
                    <DropDownProfile />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>

    </>
  );
}
export default Navbar;
