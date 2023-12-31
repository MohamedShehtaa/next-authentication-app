import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    emailType: {
      type: String,
      enum: ['emailVerification', 'resetPassword'],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.tokens || mongoose.model('tokens', tokenSchema);
