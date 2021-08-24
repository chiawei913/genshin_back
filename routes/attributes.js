import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newAttribute,
  editAttribute,
  getAllAttribute,
  getAttribute
  // getCharacterById
} from '../controllers/attributes.js'

const router = express.Router()

router.post('/', auth, upload, newAttribute)
router.get('/all', auth, getAllAttribute)
router.get('/', getAttribute)
// router.get('/:id', getCharacterById)
router.patch('/:id', auth, upload, editAttribute)

export default router
