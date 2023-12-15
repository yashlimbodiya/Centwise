// Modal.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./AddExpense.module.css";
import axios from 'axios';
import { Document, Types } from 'mongoose';
// import "react-datepicker/dist/react-datepicker.css";
import SelectExpenseType from "../ListModals/SelectExpenseType";
import SelectSplitMethod from "../ListModals/SelectSplitMethod";
import GroupListModal from "../ListModals/GroupListModal";
import FriendListModal from "../ListModals/FriendListModal";
import SelectPaidByModal from "../ListModals/SelectPayerModal";


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


const Modal: React.FC = () => {
  const [modal, setModal] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showExpenseTypeModal, setShowExpenseTypeModal] = useState(false);
  const [showSplitMethodModal, setshowSplitMethodModal] = useState(false);
  const [showGroupListModal, setShowGroupListModal] = useState(false);
  const [showFriendListModal, setShowFriendListModal] = useState(false);
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [secondModalCat, setSecondModalCat] = useState("");
  const [userData, setUserData] = useState<UserData | null | undefined>(undefined);
  const [selectedFriend, setSelectedFriend] = useState<string>("");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [splitMethod, setSplitMethod] = useState("Equal");
  const [expenseType, setExpenseType] = useState("Individual");
  const [participantType, setParticipantType] = useState("Friends");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFriendList, setSelectedFriendList] = useState({});
  const [selectedPayer, setSelectedPayer] = useState("You");
  
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.classList.contains(styles.overlay) &&
        !target.closest(`.${styles.modalContent}`) &&
        !target.closest(`.${styles.secondModalContent}`) &&
        !target.closest(`.${styles.equalModalContent}`)
      ) {
        handleClose();
      }
      if (showCalendar && !target.closest(".react-calendar")) {
        setShowCalendar(false);
      }

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

    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showCalendar]);

  

  const toggleModal = () => {
    setModal(!modal);
    //closeSecondModal();
  };

  const toggleSecondModal = () => {
    setShowSecondModal(!showSecondModal);
    console.log("sec: " + showSecondModal);
  };

  const toggleSplitMethodModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    setshowSplitMethodModal(!showSplitMethodModal);
  };

  const toggleParticipantModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    if(participantType === "Friends") {
      setShowFriendListModal(!showFriendListModal);
    } else {
      setShowGroupListModal(!showGroupListModal);
    }
  };

  const toggleExpenseTypeModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    setShowExpenseTypeModal(!showExpenseTypeModal);
    console.log("showExpenseTypeModal at 62" + showExpenseTypeModal);
  };

  const togglePayerModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
    }
    setShowPayerModal(!showPayerModal);
    console.log("showExpenseTypeModal at 62" + showExpenseTypeModal);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleModal();
    handleClose();
  };

  const handleClose = () => {
    setDescription("");
    setAmount("");
    setModal(false);
    setShowSecondModal(false);
    console.log("sec: " + showSecondModal);
    closeSplitMethodModal();
    closeSecondModal();
    closeExpenseTypeModal();
    console.log("showExpenseTypeModal at 92" + showExpenseTypeModal);

  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
    console.log("sec: " + showSecondModal);
  };

  const closeExpenseTypeModal = () => {
    setShowExpenseTypeModal(false);
    console.log(showExpenseTypeModal);
  };

  const closeSplitMethodModal = () => {
    setshowSplitMethodModal(false);
  };

  const closeGroupListModal = () => {
    setShowGroupListModal(false);
  };

  const closeFriendListModal = () => {
    setShowFriendListModal(false);
  };

  const closePayerModal = () => {
    setShowPayerModal(false);
  };

  const handleChangeSplitMethod = (method: string) => {
    setSplitMethod(method);
  }

  const handleChangeGroup = (group: string) => {
    setSelectedGroup(group);
  }

  const handleChangeFriendList = (friendList: string[]) => {
    setSelectedFriendList(friendList);
  }

  const handleChangeExpenseMethod = (type: string) => {
    setExpenseType(type);
    if(type === "Individual") {
      setParticipantType("Friends");
    } else {
      setParticipantType("Groups");
    }
  }

  const handleChangePayer = (user: string) => {
    setSelectedPayer(user);
  }

  console.log(selectedFriendList);

  const addExpense = async (
    Payer: string,
    description: string,
    amount: string,
    expenseType: string,
    splitMethod: string,
    participantType: string,
    selectedGroup: string,
    selectedFriendList: {}
  ) => {
    try {
      // Create an expenseData object to send in the request
      const expenseData = {
        payer: selectedPayer,
        description: description,
        usersInvolved: selectedFriendList,
        groupInvolved: selectedGroup,
        amount: amount, // Convert amount to a number if needed
        created_by: userData?._id,
        partition: splitMethod,
        expenseType: expenseType,
         // Assuming selectedFriend is the payer's ID
      };
  
      // Use Axios to send a POST request
      const response = await axios.post('/api/expense/addExpense', expenseData);
  
      console.log('Expense added successfully:', response.data);
      // You can also return the response if needed
      return response.data;
    } catch (error: any) {
      // Handle errors
      console.error('Error adding expense:', error.message);
      // You might want to throw the error or handle it accordingly
      throw error;
    }
  };
  return (
    <>
      {
        modal && (
          <div
            ref={modalContentRef}
            className={styles.modal}
          >
            <div onClick={handleClose} className={styles.overlay}></div>
            <div className={styles.modalContent}>
              <h3>Add an expense</h3>
              <form onSubmit={handleFormSubmit}>
                <label className={styles.description}>
                  <input type="text" value={description} placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <hr className={styles.hr}/>
                <label className={styles.currency}>
                  $:
                  <input type="text" value={amount} onChange={(e) => setAmount((e.target as HTMLInputElement).value)} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,"");}}/>
                </label>

                <hr className={styles.hr}/>
                <label>
                  Expense type:
                  <button type="button" value="expenseType" className={styles.btn} onClick={toggleExpenseTypeModal}>
                    { expenseType }
                  </button>
                </label>

                <label>
                  and Split:
                  <button
                    type="button"
                    value="split"
                    className={styles.btn}
                    onClick={toggleSplitMethodModal}
                  >
                    { splitMethod }
                  </button>
                </label>
                <br />
                <label>
                  Paid By:
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={togglePayerModal}
                  >
                    { selectedPayer}
                  </button>
                </label>
                <label>
                  { participantType }:
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={toggleParticipantModal}
                  >
                    { participantType === "Friends" ? "Friends" : selectedGroup}
                  </button>
                </label>
                <br />

                <br />
                {/* <button type="button" className={styles.group}>
                  Select Group
                </button> */}

                <div className={styles.buttonGroup}>
                <button type="submit" className={styles.save} 
                onClick={() => addExpense(selectedPayer, description, amount, expenseType, splitMethod, participantType, selectedGroup, selectedFriendList)}>
                        Save
                      </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className={styles.cancel}
                  >
                    Cancel
                  </button>
                  <button className={styles.closeModal} onClick={toggleModal}>
                    X
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {console.log("showExpenseTypeModal at 62" + showExpenseTypeModal)}
      {showPayerModal && <SelectPaidByModal onClose={closePayerModal} onClick={handleChangePayer}/>}
      {showExpenseTypeModal && <SelectExpenseType onClose={closeExpenseTypeModal} onClick={handleChangeExpenseMethod}/>}
      {showSplitMethodModal && <SelectSplitMethod onClose={closeSplitMethodModal} onClick={handleChangeSplitMethod}/>}
      {showGroupListModal && <GroupListModal onClose={closeGroupListModal} onClick={handleChangeGroup}/>}
      {showFriendListModal && <FriendListModal onClose={closeFriendListModal} onClick={handleChangeFriendList}/>}
    </>
  );
};

export default Modal;
