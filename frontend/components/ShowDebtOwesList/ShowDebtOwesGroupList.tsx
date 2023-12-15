import ShowDebtOwesListGroupCard from "../ShowDebtOwesListCard/ShowDebtOwesListGroupCard";
import styles from "./ShowDebtOwesList.module.css";
import { Document, Types } from 'mongoose';
import ChartModal from "../ChartVisuals/ChartModal";
import { useState } from "react";
import groupIcon from "../../../public/images/groupIcon.png";
import groupIcon1 from "../../../public/images/groupIcon1.png";



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
      you_paid: string;
      you_lent: string;
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

interface Props {
  userData?: UserData | null;
}

const ShowDebtOwesGroupList: React.FC<Props> = ({userData}) => {

    const groupList = userData?.groups || [];
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
                    <div className={styles.label}>
                        You Owe
                    </div>
                    {groupList.map((group) => (
            <ShowDebtOwesListGroupCard
              key={group.group.toString()} 
              imgSrc={groupIcon} 
              username={`${group.group_name}`} 
              you_lent={''} 
              you_paid={group.you_paid} 
            />
          ))}
        </div>
        <div className={styles.flexChild}>
          <div className={styles.label}>You are owed</div>
          {groupList.map((group) => (
            <ShowDebtOwesListGroupCard
            key={group.group.toString()} 
            imgSrc={groupIcon1} 
            username={`${group.group_name}`} 
            you_lent={group.you_lent} 
            you_paid={''}  
            />
          ))}
                </div>
            </div>
        </div>
    );
}

export default ShowDebtOwesGroupList;
