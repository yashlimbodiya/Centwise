import React, { useState } from 'react';
import ShowDebtOwesListCard from "../ShowDebtOwesListCard/ShowDebtOwesListCard";
import styles from "./ShowDebtOwesList.module.css";
import ChartModal from "../ChartVisuals/ChartModal";
import { Document, Types } from 'mongoose';
import userIcon1 from "../../../public/images/userIcon1.png";
import userIcon2 from "../../../public/images/userIcon2.png";

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

interface Props {
  userData?: UserData | null;
}

const ShowDebtOwesList: React.FC<Props> = ({ userData }) => {
  const friendsList = userData?.friends || [];
  const [isModalVisible, setModalVisible] = useState(false);

  const viewChartHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.viewChartbtn} onClick={viewChartHandler}>View Chart</button>
      </div>
      {isModalVisible && <ChartModal isVisible={isModalVisible} onClose={closeModalHandler} />}
      <div className={styles.flexContainer}>
        <div className={styles.flexChild}>
          <div className={styles.label}>You Owe</div>
          {friendsList.map((friend) => (
            friend.amountInDeal < 0 && (
              <ShowDebtOwesListCard
                key={friend.friend._id}
                imgSrc={userIcon2}
                username={`${friend.friend_first_name}`}
                amount={`$${Math.abs(friend.amountInDeal).toFixed(2)}`}
              />
            )
          ))}
        </div>
        <div className={styles.flexChild}>
          <div className={styles.label}>You are owed</div>
          {friendsList.map((friend) => (
            friend.amountInDeal >= 0 && (
              <ShowDebtOwesListCard
                key={friend.friend._id}
                imgSrc={userIcon1}
                username={`${friend.friend_first_name}`}
                amount={`$${friend.amountInDeal.toFixed(2)}`}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowDebtOwesList;
