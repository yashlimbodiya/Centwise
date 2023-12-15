import ShowAmountDetails from "../ShowAmountDetails/ShowAmountDetails";
import styles from "./DashboardCmp.module.css";
import ShowDebtOwesList from "../ShowDebtOwesList/ShowDebtOwesList";
import ShowDebtOwesGroupList from '../ShowDebtOwesList/ShowDebtOwesGroupList';
import React, { useState, ChangeEvent, FormEvent,useEffect  } from "react";
import axios from 'axios';
import { Document, Types } from 'mongoose';


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
    _id: string,
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
    groups: Group[];
  }

const DashboardCmp = () => {
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

    return (
        <div>
            <div className={styles.mainContainer}>
                <div>
                    <div className={styles.summary}>Total Summary</div>
                    <div className={styles.container}>
                        <ShowAmountDetails label="Total amount you owe" amount={`$${userData?.totalOweAmount}`} color="orange" />
                        <ShowAmountDetails label="Total amount owe to you" amount={`$${userData?.totalOweToSelf}`} color="green" />
                        <ShowAmountDetails label="Total balance" amount={`$${userData?.totalBalance}`} color="grey" />
                    </div>
                    <hr className={styles.hr} />
                </div>
                <div className={styles.listCard}>
                    <div className={styles.summary}>Friends</div>
                    <ShowDebtOwesList userData={userData}/>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.listCard}>
                <div className={styles.summary}>Groups</div>
                <ShowDebtOwesGroupList userData={userData}/>
            </div>
        </div>
    );
}

export default DashboardCmp;