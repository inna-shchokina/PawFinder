import mongoose from 'mongoose';

const matchResultSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  adopterExplanation: {
    type: String,
    required: true
  },
  shelterAssessment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

matchResultSchema.index({ petId: 1, userId: 1 }, { unique: true });

export default mongoose.model('MatchResult', matchResultSchema);