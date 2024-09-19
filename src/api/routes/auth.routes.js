import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import {verifyToken}from '../middlewares/auth.middleware.js'
const router = Router()

router.post('/register', authController.register)
router.get('/check', verifyToken, authController.hasCookie)
router.post('/login', authController.logIn)
router.get('/logout', authController.logout)

export default router
