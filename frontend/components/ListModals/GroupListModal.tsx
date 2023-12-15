// EqualModal.tsx
import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../AddExpense/AddExpense.module.css";

interface GroupListModalProps {
    onClose: () => void;
    onClick: (method: string) => void;
}

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

const GroupListModal: FC<GroupListModalProps> = (props) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Close the modal if clicked outside its content
            if (
                modalContentRef.current &&
                !modalContentRef.current.contains(target)
            ) {
                props.onClose();
            }
        };


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


        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [props.onClose]);

    const handleSave = () => {
        props.onClick(selectedGroup);
        props.onClose();
    }


    const handleRadioChange = (group: string) => {
        setSelectedGroup(group);
    };

    //const list = ["Group1", "Group2", "Group3", "Group4", "Group5"];

    return (
        <div className={styles.EqualModal}>
            <div ref={modalContentRef} className={styles.modalContent}>
                <h2>Select Group</h2>
                <hr />
                {
                    userData?.groups.map((group) => (
                        <div className={`${styles.row} ${styles.card_input}`} key={group.group.toString()}>
                            <label className={styles.label}>
                                <input
                                    type="radio"
                                    name="splitMethod"
                                    className={styles.card_input_element}
                                    onChange={() => handleRadioChange(group.group_name)}
                                    checked={selectedGroup === group.group_name}
                                />
                                <span className={styles.panel_body}>
                                    {group.group_name}
                                </span>
                            </label>
                        </div>
                    ))
                }
                <button type="submit" className={styles.save} onClick={handleSave}>
                    Save
                </button>
                <button type="button" onClick={props.onClose} className={styles.cancelEqual}>
                    X
                </button>
            </div>
        </div>
    );
};

export default GroupListModal;
