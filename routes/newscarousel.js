import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newNewcarousel,
  getAllNewcarousel,
  // getNewcarouselById,
  editNewcarousel,
  getNewcarousel
} from '../controllers/newscarousel.js'

const router = express.Router()

router.post('/', auth, upload, newNewcarousel)
router.get('/', getNewcarousel)
router.get('/all', auth, getAllNewcarousel)
// router.get('/:id', getNewcarouselById)
router.patch('/:id', auth, upload, editNewcarousel)

export default router
