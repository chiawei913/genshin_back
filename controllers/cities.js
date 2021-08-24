import cities from '../models/cities.js'
export const newCity = async (req, res) => {
  console.log('123')
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const result = await cities.create({
      name: req.body.name,
      description: req.body.description,
      country: req.body.country,
      ins_date: new Date(),
      ins_userid: req.user.account,
      show: req.body.show,
      image: req.filepath
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

export const getAllCity = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await cities.find().populate('country')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getCity = async (req, res) => {
  try {
    const result = await cities.find({ show: true }).populate('country')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const getCityById = async (req, res) => {
//   try {
//     const result = await cities.findOne({ _id: null })
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     if (error.name === 'CastError') {
//       res.status(404).send({ success: false, message: '查無此城鎮' })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const editCity = async (req, res) => {
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
      name: req.body.name,
      description: req.body.description,
      country: req.body.country,
      upd_date: new Date(),
      upd_userid: req.user.account,
      show: req.body.show
    }
    if (req.filepath) data.image = req.filepath
    const result = await cities.findByIdAndUpdate(req.params.id, data, { new: true })
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
