import features from '../models/features.js'

export const newFeature = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const result = await features.create({
      title: req.body.title,
      image: req.filepath,
      ins_date: new Date(),
      ins_userid: req.user.account,
      show: req.body.show
    })
    res.status(200).send({ success: true, message: '', result })
    console.log(result)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getAllFeature = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await features.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getFeature = async (req, res) => {
  try {
    const result = await features.find({ show: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const getFeatureById = async (req, res) => {
//   try {
//     const result = await features.findById(req.params.id)
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     if (error.name === 'CastError') {
//       res.status(404).send({ success: false, message: '查無此特色' })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const editFeature = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const data = {
      title: req.body.title,
      upd_date: new Date(),
      upd_userid: req.user.account,
      show: req.body.show
    }
    if (req.filepath) data.image = req.filepath
    const result = await features.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
    console.log(req)
    console.log(result)
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message: message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
