import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

import {
  newFeature,
  getAllFeature,
  // getFeatureById,
  editFeature,
  getFeature
} from '../controllers/features.js'

const router = express.Router()

router.post('/', auth, upload, newFeature)
router.get('/all', auth, getAllFeature)
router.get('/', getFeature)
// router.get('/:id', getFeatureById)
router.patch('/:id', auth, upload, editFeature)

export default router
