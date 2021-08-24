import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newCharacter,
  editCharacter,
  getAllCharacter,
  getCharacter
  // getCharacterById
} from '../controllers/characters.js'

const router = express.Router()

router.post('/', auth, upload, newCharacter)
router.get('/', getCharacter)
router.get('/all', auth, getAllCharacter)
// router.get('/:id', getCharacterById)
router.patch('/:id', auth, upload, editCharacter)

export default router
