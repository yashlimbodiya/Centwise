import React, { useEffect, useState } from "react";
import styles from "./AllExpensesCmp.module.css"
import AllExpenses from "./AllExpenses";
import flightIcon from "../../../public/images/AeroplaneIcon.png";
import AddExpense from "../AddExpense/AddExpense";
import Settleup from "../Settleup/Settleup"

interface Expense {
    id:string;
    month: string;
    date:number;
    icon: string;
    expense: string;
    expense_type: string;
    youPaid: number;
    youLent: number;
    line?: boolean;
  }


const AllExpensesCmp: React.FC = () => {
    const [allExpensesData, setAllExpensesData] = useState<Expense[]>([]);
    useEffect(() => {
        // Fetch data from the backend API
        fetch("F:/Classwork/INFO-6150 Web Design and UX Engineering/Project Unofficial/pre-prod/app/testData/AllExpensesData.json")
      .then((response) => response.json())
      .then((data) => {
        setAllExpensesData(data);
        // console.log(data); // Log the data here
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  return (
    <div>
      <AllExpenses />
      <div>
        {allExpensesData.map((expenseData) => (
          <div key={expenseData.id} >
            
               <span className={styles.expenseItem}>
            <span className={styles.monthdate}>
            <p className={styles.month}> {expenseData.month}</p>
            <p className={styles.date}> {expenseData.date}</p>
            </span>
            {expenseData.icon && (
            <img className={styles.icon} src={flightIcon} alt="Flight Icon" />
            )}
            <div className={styles.dataExpense}>
            <p className={styles.expense}>{expenseData.expense}</p>
            <p className={styles.expense_type}>{expenseData.expense_type}</p>
            </div>
            {expenseData.youPaid && (
               <span>
               <p className={styles.paid}>You Paid:</p>
               <p className={styles.paidData}>{expenseData.youPaid}</p>
             </span>
             
            )}
            {expenseData.youLent && (
                <span>
                  <p className={styles.lent}>You Lent:</p>
                  <p className={styles.lentData}>{expenseData.youLent}</p>
                </span>
              )}
             
            </span>
            {expenseData.line && <hr />}
          </div>
            
        
          
          
        ))}
      </div>
      
    </div>
  );
};

export default AllExpensesCmp;