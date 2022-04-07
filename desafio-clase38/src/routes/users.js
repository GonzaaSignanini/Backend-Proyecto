import express from "express";
import userController from '../controllers/users.js'

const router = express.Router()

router.get('/',userController.getUsers)
router.get('/:uid',userController.getUserById)
router.post('/',userController.saveUser)

export default router