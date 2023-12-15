import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paidShare: {
    type: Number,
    required: true,
  },
  owedShare: {
      type: Number,
      required: true
  }
});

const participants = mongoose.model('participant', participantSchema);

export default participantSchema;