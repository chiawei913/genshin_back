import characters from '../models/characters.js'

export const newCharacter = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不正確' })
    return
  }
  try {
    const result = await characters.create({
      name: req.body.name,
      description: req.body.description,
      country: req.body.country,
      attribute: req.body.attribute,
      seiyuu: req.body.seiyuu,
      seiyuu_audio: req.filepath3,
      big_image: req.filepath1,
      small_image: req.filepath2,
      phone_image: req.filepath4,
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

export const getCharacter = async (req, res) => {
  try {
    const result = await characters.find({ show: true }).populate('country').populate('attribute').lean()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getAllCharacter = async (req, res) => {
  if (req.user.role > 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await characters.find().populate('country').populate('attribute').lean()
    res.status(200).send({ success: true, message: '', result })
    console.log(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const getCharacterById = async (req, res) => {
//   try {
//     const result = await characters.findById(req.params.id)
//     res.status(200).send({ success: true, message: '', result })
//   } catch (error) {
//     if (error.name === 'CastError') {
//       res.status(404).send({ success: false, message: '查無此角色' })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const editCharacter = async (req, res) => {
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
      attribute: req.body.attribute,
      seiyuu: req.body.seiyuu,
      upd_date: new Date(),
      upd_userid: req.user.account,
      show: req.body.show
    }
    if (req.filepath1) data.big_image = req.filepath1
    if (req.filepath2) data.small_image = req.filepath2
    if (req.filepath3) data.seiyuu_audio = req.filepath3
    if (req.filepath4) data.phone_image = req.filepath4
    const result = await characters.findByIdAndUpdate(req.params.id, data, { new: true })
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
