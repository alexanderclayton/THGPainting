import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: false,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  projectType: {
    type: String,
    enum: ['painting', 'christmas-lights', 'other'],
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paymentType: {
    type: String,
    enum: ['cash', 'check', 'venmo'],
    required: false,
  },
  images: {
    type: [String],
    required: false,
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;


