import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newCity,
  editCity,
  getAllCity,
  getCity
  // getCityById
} from '../controllers/cities.js'

const router = express.Router()

router.post('/', auth, upload, newCity)
router.get('/all', auth, getAllCity)
router.get('/', getCity)
// router.get('/', auth, getCityById)
router.patch('/:id', auth, upload, editCity)

export default router
