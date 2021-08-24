import mongoose from 'mongoose'

const Schema = mongoose.Schema

const characterSchema = new Schema({
  name: {
    type: String,
    required: [true, '角色名不能為空'],
    minlength: [1, '角色名必須1個字以上']
  },
  description: {
    type: String,
    required: [true, '角色介紹不能為空'],
    minlength: [1, '角色介紹必須1個字以上']
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries'
  },
  attribute: {
    type: Schema.Types.ObjectId,
    ref: 'attributes'
  },
  seiyuu: {
    type: String,
    required: [true, '角色聲優不能為空'],
    minlength: [1, '角色聲優必須1個字以上']
  },
  seiyuu_audio: {
    type: String
  },
  big_image: {
    type: String
  },
  small_image: {
    type: String
  },
  phone_image: {
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

export default mongoose.model('characters', characterSchema)
