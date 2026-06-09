import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'My Resume',
    },
    resumeData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ['student', 'fresher', 'experienced'],
      default: 'experienced',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
