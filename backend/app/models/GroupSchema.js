import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  group_type: {
      type: String,
  },
  created_date:{
      type: Date,
      default: Date.now,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }
  ],
  expenses: [
    {
      expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
      },
    }
  ],
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
