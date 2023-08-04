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
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique'
    ]
  },
  password: {
    type: String,
    required: [true, 'password is required']
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

export default User
