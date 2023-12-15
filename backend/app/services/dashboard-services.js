import User from '../models/UserSchema.js';
/*import Expense from '../models/ExpenseSchema';
import Group from '../models/GroupSchema';
import participantSchema from '../models/ParticipantsSchema';*/


export const fetchUserData = async (id) => {
      const users = await User.findById(id).exec();
      return users;
  }

export const updateUserData = async(userId, updatedData) => {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        //console.log('Updated User');
        //console.log(updatedUser);
        return updatedUser; 
}