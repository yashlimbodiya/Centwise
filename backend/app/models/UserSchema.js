import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  ph_no: {
    type: String,
    //required: true,
    //unique: true,
  },
  created_date:{
    type: Date,
    default: Date.now,
},
totalOweAmount: {
  type: Number,
  default: 0
},
totalOweToSelf: {
  type: Number,
  default: 0
},
totalBalance: {
  type: Number,
  default: 0
},
  friends: [
    {
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    amountInDeal: {
      type: Number,
      default: 0
    },
    friend_first_name: {
      type: String,
    },
    friend_last_name: {
      type: String,
    },
  }
  ],
  expenses: [
    {
      expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
      },
      description:{
        type: String
      },
      amount:{
        type: Number,
      }
    }
  ],
  groups: [
    {
      group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
      group_name: {
        type: String,
      },
      you_paid: {
        type: Number,
        default: 0,
      },
      you_lent: {
        type: Number,
        default: 0,
      }
    }
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;