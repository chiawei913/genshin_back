import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newSchema = new Schema({
  title: {
    type: String,
    required: [true, '標題不能為空'],
    minlength: [1, '標題必須1個字以上']
  },
  content: {
    type: String,
    required: [true, '內容不能為空'],
    minlength: [1, '內容必須1個字以上']
  },
  category: {
    type: String,
    required: [true, '類別不能為空']
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

export default mongoose.model('news', newSchema)
