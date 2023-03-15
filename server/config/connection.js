import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thgpainting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

export default db;

