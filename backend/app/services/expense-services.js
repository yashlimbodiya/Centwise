import Expense from '../models/ExpenseSchema.js';
import User from '../models/UserSchema.js';
import Group from '../models/GroupSchema.js';

export const addExpense = async (request) => {
            try {
                  //console.log(request.body);
                  let groupInfo;
                  let usersInfo;
                  const { payer, description, usersInvolved, groupInvolved, amount, created_by, partition, expenseType } = request.body; 
                  let payerUser;
                  const currUser = await User.findById(request.user._id).exec();

                  if(payer === 'You'){
                     payerUser = await User.findById(request.user._id).exec();
                  }
                  else{
                    payerUser = await User.findOne({ first_name: payer });
                  }
                  const expenseData = {
                    Payer: payerUser._id,  // Assuming created_by is the user who pays
                    description,
                    usersInvolved: [],
                    groupInvolved: [],
                    amount,
                    created_by,
                    partition,
                    expenseType,
                  };
                  
                  //Individual Expense
                  if (groupInvolved === '' && usersInvolved.length > 0) {
                     usersInfo = await User.find({ first_name: { $in: usersInvolved } });
                    const currUserObject = currUser.toObject();
                    usersInfo.push(currUserObject);
                    let friendOwedShare = parseFloat(amount)/(usersInvolved.length+1);
                    let friendPaidShare;
                    if (usersInfo && usersInfo.length > 0) {
                      usersInfo.forEach(async user => {
                        //console.log(user._id + " " + currUser._id);
                        if(user && user._id && payerUser && payerUser._id && user._id.equals(payerUser._id)){
                          friendPaidShare = parseFloat(amount);
                          //console.log("reached line 41");
                          //Total owe amount of user dashboard
                          if(user.totalOweToSelf - (friendPaidShare-friendOwedShare) >= 0){
                            user.totalOweToSelf = user.totalOweToSelf - (friendPaidShare-friendOwedShare);
                          }else{
                            let diff = Math.abs(user.totalOweToSelf- (friendPaidShare-friendOwedShare));
                            user.totalOweToSelf = 0;
                            user.totalOweAmount += diff;
                          }
                        }else{
                          friendPaidShare = 0;
                          if(user.totalOweAmount-friendOwedShare >= 0){ 
                            user.totalOweAmount -= friendOwedShare;
                          }else{
                            let diff1 = Math.abs(user.totalOweAmount-(friendOwedShare));
                            user.totalOweToSelf += friendOwedShare;
                          }
                        }

                        user.totalBalance = user.totalOweAmount - user.totalOweToSelf;

                        
                        user.friends.amountInDeal = friendOwedShare;
                        console.log("Manan");
                        console.log(user.friends.amountInDeal);

                        expenseData.usersInvolved.push({
                          user: user._id,
                          user_first_name: user.first_name,
                          user_last_name: user.last_name,
                          paidShare: friendPaidShare, 
                          owedShare: friendOwedShare, 
                        });

                        //console.log(usersInfo);

                        await User.findByIdAndUpdate(user._id, {
                          $set: {
                            totalOweToSelf: user.totalOweToSelf,
                            totalOweAmount: user.totalOweAmount,
                            totalBalance: user.totalBalance,
                          },
                          $push: {
                            'friends.$[elem].amountInDeal': user.friends.amountInDeal,
                          }
                        }, { arrayFilters: [{ 'elem.friend': user._id }] });

                      });
                    } else {
                      console.log('No users found.');
                    }
                    

                    //console.log(usersInfo);
                  } else {
                          groupInfo = await Group.findOne({ description: groupInvolved });
                          const currUserObject = currUser.toObject();

                          // Add currUser to usersInfo
                          //groupInfo.push(currUserObject);

                          let groupOwedShare = parseFloat(amount)/(groupInfo.users.length);
                          let groupPaidShare;

                          if (groupInfo) {                  
                            groupInfo.users.forEach(async user => {
                                if(user && user._id && payerUser && payerUser._id && user._id.equals(payerUser._id)){
                                  groupPaidShare = parseFloat(amount);
                                  //Total owe amount of user dashboard
                                  if(user.totalOweToSelf - (groupPaidShare-groupOwedShare) >= 0){
                                    user.totalOweToSelf = user.totalOweToSelf - (groupPaidShare-groupOwedShare);
                                  }else{
                                    let diff = Math.abs(user.totalOweToSelf- (groupPaidShare-groupOwedShare));
                                    user.totalOweToSelf = 0;
                                    user.totalOweAmount += diff;
                                  }
                                }else{
                                  groupPaidShare = 0;
                                  if(user.totalOweAmount-groupOwedShare >= 0){ 
                                    user.totalOweAmount -= groupOwedShare;
                                  }else{
                                    let diff1 = Math.abs(user.totalOweAmount-(groupOwedShare));
                                    user.totalOweToSelf += groupOwedShare;
                                  }
                                }
        
                                user.totalBalance = user.totalOweAmount - user.totalOweToSelf;
        
                                user.friends.amountInDeal = groupOwedShare;
                                

                                expenseData.usersInvolved.push({
                                  user: user._id,
                                  user_first_name: user.first_name,
                                  user_last_name: user.last_name,
                                  paidShare: groupPaidShare, //algo left part
                                  owedShare: groupOwedShare, //algo left part
                                });

                                groupInfo.users.forEach(async user => {
                                  await User.findByIdAndUpdate(user._id, {
                                    $set: {
                                      totalOweToSelf: user.totalOweToSelf,
                                      totalOweAmount: user.totalOweAmount,
                                      totalBalance: user.totalBalance,
                                    },
                                    $push: {
                                      'friends.$[elem].amountInDeal': user.friends.amountInDeal,
                                    }
                                  }, { arrayFilters: [{ 'elem.friend': user._id }] });
                                });
                            });

                            expenseData.groupInvolved.push({
                              group: groupInfo._id,
                              group_name: groupInfo.description,
                            })
                        } else {
                            console.log("Group not found.");
                        }
                          // Handle other cases or return an empty array if needed
                          console.log([]);
                  }

                  const expense = new Expense(expenseData);
                  
                  console.log('expense Data');

                  //.log(expenseData);
              
                  
              
                  // Use Mongoose to create a new expense
                  const createdExpense = await Expense.create(expenseData);

                  if (usersInfo && usersInfo.length > 0) {
                    const expenseUpdate = {
                      $push: {
                        expenses: {
                          expense: createdExpense._id,
                          description: createdExpense.description,
                          amount: createdExpense.amount
                        }
                      }
                    };
                  
                    // Update the expenses array for all users in usersInfo
                    await User.updateMany({ _id: { $in: usersInfo.map(user => user._id) } }, expenseUpdate);
                  
                    console.log('Updated expenses for all users');
                  } else {
                    console.log('No users found.');
                  }

                  if (groupInfo && groupInfo.users && groupInfo.users.length > 0) {
                    const expenseUpdate = {
                      $push: {
                        expenses: {
                          expense: createdExpense._id,
                          description: createdExpense.description,
                          amount: createdExpense.amount
                        }
                      }
                    };
                  
                    // Update the expenses array for all users in groupInfo
                    await User.updateMany({ _id: { $in: groupInfo.users.map(user => user._id) } }, expenseUpdate);
                  
                    console.log('Updated expenses for all users in the group');
                  } else {
                    console.log('No users found in the group.');
                  }
                  
              
                  //console.log('Expense added successfully:', createdExpense);
                  //response.status(201).json(createdExpense);
                } catch (error) {
                  // Handle errors
                  console.error('Error adding expense:', error.message);
                  //response.status(500).json({ error: 'Internal Server Error' });
                }  
      
};