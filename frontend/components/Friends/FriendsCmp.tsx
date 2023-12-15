import styles from "./Friends.module.css";
import ShowDebtOwesList from "../ShowDebtOwesList/ShowDebtOwesList";
import React, { useState, ChangeEvent, FormEvent,useEffect  } from "react";
import axios from 'axios';
import { Document, Types } from 'mongoose';
import { useNavigate } from "react-router-dom";
import AddedCentwiseFriend from "../AddCentwiseFriend/AddCentwiseFriend";


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
  friend_first_name: string;
  friend_last_name: string;
}

interface Participant {
  _id: Types.ObjectId;
}

interface Expense {
  _id: string;
  Payer: Types.ObjectId;
  participants: Participant[];
  amount: number;
  currency: string;
  created_by: Types.ObjectId;
  created_date: Date;
  partition: string[];
}

interface Group {
  group: Types.ObjectId;
  group_name: string;
  you_paid: number;
  you_lent: number;
}

interface UserData extends Document {
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
  groups: Group[];
}

const DashboardCmp = () => {
  const [userData, setUserData] = useState<UserData | null | undefined>(undefined);
    const [addFriendModal, setAddFriendModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get('/api/dashboard');
            const data = response.data;
            setUserData(data);
          } catch (error: any) {
            console.error('Error getting data from the database:', error.message);
          }
        };
  
        fetchData();
  }, []);

    const handleClick = () => {
      setAddFriendModal(!addFriendModal);
    }

    return (
        <div>
            {addFriendModal && <AddedCentwiseFriend  />}
            <div className={styles.mainContainer}>
                <div className={styles.listCard}>
                  <div className={styles.heading}>
                  <div className={styles.summary}>Friends</div>
                    <button className={styles.addFriendBtn} onClick={handleClick}>
                    + Add Friend
                  </button>
                  </div>
                  <hr className={styles.hr}/>
                    <ShowDebtOwesList userData={userData}/>
                </div>
            </div>
        </div>
    );
}

export default DashboardCmp;