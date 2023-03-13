const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  client: {
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
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
