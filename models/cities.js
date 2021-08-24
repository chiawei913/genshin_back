import mongoose from 'mongoose'

const Schema = mongoose.Schema

const citySchema = new Schema({
  name: {
    type: String,
    required: [true, '小鎮名不能為空'],
    minlength: [1, '小鎮名必須1個字以上']
  },
  description: {
    type: String,
    required: [true, '小鎮介紹不能為空'],
    minlength: [1, '小鎮介紹必須1個字以上']
  },
  country: {
    // 存放 countries 的 _id
    type: Schema.Types.ObjectId,
    ref: 'countries'
  },
  image: {
    type: String
  },
  ins_date: {
    type: Date,
    required: [true, '日期不能為空']
  },
  ins_userid: {
    type: String,
    required: [true, '創建者不能為空']
  },
  upd_date: {
    type: Date
  },
  upd_userid: {
    type: String
  },
  show: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('cities', citySchema)
