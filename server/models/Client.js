const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  address: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true 
},
  phoneNumber: { 
    type: String, 
    required: true 
},
  projects: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project' }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
