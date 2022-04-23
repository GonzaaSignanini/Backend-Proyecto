import express from 'express'
import userContoller from '../controllers/userContoller.js'

const router = express.Router()

router.get('/', userContoller.getUsers)
router.post('/',userContoller.saveUser)

export default router

