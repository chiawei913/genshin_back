import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newscarouselSchema = new Schema({
  image: {
    type: String
  },
  hyperlink: {
    type: String,
    required: [true, '連結不能為空']
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

export default mongoose.model('newscarousel', newscarouselSchema)
