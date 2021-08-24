import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號不能超過 20 個字'],
    unique: true,
    required: [true, '帳號不能為空']
  },
  accountname: {
    type: String,
    minlength: [1, '使用者名稱必須 1 個字以上'],
    required: [true, '使用者名稱不能為空']
  },
  password: {
    type: String,
    minlength: [4, '密碼必須 4 個字以上'],
    required: [true, '密碼不能為空']
  },
  email: {
    type: String,
    required: [true, '信箱不能為空'],
    unique: true,
    validate: {
      validator: (email) => {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  role: {
    // 0 = 一般使用者
    // 1 = 管理員
    // 2 = 停權
    type: Number,
    required: [true, '沒有使用者分類']
  },
  tokens: {
    type: [String]
  }
}, { versionKey: false })

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = md5(user.password)
  }
  next()
})

export default mongoose.model('backusers', UserSchema)
