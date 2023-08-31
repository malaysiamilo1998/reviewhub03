import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    unique: [true, 'Username already exists'],
    required: [true, 'username is required'],
    match: [
      /^(?=.{8,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9\._\-@]+(?<![_.])$/,
      'Username invalid, it should contain 8-50 alphanumeric letters and be unique'
    ]
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  provider: {
    type: String
  },
  mobile: {
    type: String
  }
})

const User = models.Member || model('Member', UserSchema)
console.log('retrieve model user!')
export default User
