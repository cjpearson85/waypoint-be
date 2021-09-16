const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: 'string',
      required: false,
      maxLength: 50,
    },
    avatar_url: {
      type: 'string',
      required: false,
      default:
        'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
      maxLength: 200,
    },
    username: { type: 'string', required: true, unique: true, maxLength: 15 },
    hash: { type: 'string', required: true },
    salt: { type: 'string', required: true },
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)
module.exports = User
