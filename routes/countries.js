import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newCountry,
  editCountry,
  getAllCountry,
  // getCountryById,
  getCountry
} from '../controllers/countries.js'

const router = express.Router()

router.post('/', auth, upload, newCountry)
router.get('/', getCountry)
router.get('/all', auth, getAllCountry)
// router.get('/:id', getCountryById)
router.patch('/:id', auth, upload, editCountry)

export default router
