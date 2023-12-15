import React, {useState, useEffect} from "react";
import styles from "./GroupNameCard.module.css";
import { Document, Types } from 'mongoose';
import axios from 'axios';
import groupIcon from "../../../public/images/groupIcon.png"

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
function GroupNameCard() {
  const [userData, setUserData] = useState<UserData | null>(null);
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
      <img src=""></img>

      return (
        <>
          <div className={styles.GroupNameCard}>
            {userData?.groups &&
              userData.groups.map((group) => (
                <div key={String(group.group)} className={styles.groupCard}>
                  <div className={styles.horizontalLine}></div>
                  <div className={styles.justBeforeTheDp}>
                    {/* Adjust the image source accordingly */}
                    <img
                      className={styles.userProfile}
                      src={groupIcon} 
                      alt={`Group Icon for ${group.group_name}`} 
                    />
                    <div className={styles.groupDetails}>
                      <p className={styles.groupName}>{group.group_name}</p>
                    </div>
                    <div className={styles.groupExpenses}>
                      <div className={styles.youPaid}>
                        <p>You paid</p>
                        <p className={styles.paidAmount}>{group.you_paid}</p>
                      </div>
                      <div className={styles.youLent}>
                        <p>You lent</p>
                        <p className={styles.lentAmount}>{group.you_lent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      );
}

export default GroupNameCard;