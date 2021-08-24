import express from 'express'
import auth from '../middleware/auth.js'
import {
  register,
  login,
  logout,
  extend,
  getuserinfo,
  getUsers,
  // getUser,
  updateUser,
  updateUserPassword
} from '../controllers/backusers.js'

const router = express.Router()

router.post('/', register)
router.get('/', auth, getuserinfo)
router.get('/all', auth, getUsers)
// router.get('/:id', auth, getUser)
router.patch('/:id', auth, updateUser)
router.patch('/:id/password', auth, updateUserPassword)
router.post('/login', login)
router.delete('/logout', auth, logout)
router.post('/extend', auth, extend)

export default router
