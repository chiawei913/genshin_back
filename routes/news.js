import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newNew,
  editNew,
  getAllNew,
  getNewById,
  getNew
} from '../controllers/news.js'

const router = express.Router()

router.post('/', auth, upload, newNew)
router.get('/', getNew)
router.get('/all', auth, getAllNew)
router.get('/:id', getNewById)
router.patch('/:id', auth, upload, editNew)

export default router
