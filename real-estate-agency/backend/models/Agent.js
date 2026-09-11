import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Agent name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Agent email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Agent phone is required'],
      trim: true,
    },
    photo: {
      type: String,
      required: [true, 'Agent photo URL is required'],
    },
    designation: {
      type: String,
      required: [true, 'Agent designation is required'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Agent bio is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
