const mongoose = require('mongoose')

const URL = process.env.NODE_ENV === 'production' ? 'mongodb://root:123456@db:27017/admin' : 'mongodb://root:123456@localhost:27017/admin'

var connect = function () {
  mongoose.connect(URL, {useNewUrlParser: true})
}
connect()

mongoose.connection.on('error', function(err) {
  console.log('Could not connect to MongoDB');
  if (err) {
    console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
    setTimeout(connect, 5000);
  }
});

mongoose.connection.on('connected', function() {
  // we're connected!
  console.log('mongodb is connected!')
});

var UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String
})

var User =  mongoose.model('user', UserSchema)

module.exports = {
  User
}