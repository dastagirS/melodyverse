const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

let user 

try {
  user = mongoose.model('users')
} catch (error) {
  user = mongoose.model('users', userSchema)
}
module.exports = user
