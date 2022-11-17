import { connect } from 'mongoose';
import 'colors';
const URI = process.env.MONGODB_URI;

connect(URI)
  .then(() => console.log('\nConnected to MongoDB!!!\n'.white.bold))
  .catch(err => console.error('\nCould not connect to MongoDB\n'.red, err));
