import express from 'express'
import { getUserDetails,signInController, signOutController, signUpContoller, updateUserDetails } from '../controller/auth.controller'


const router = express.Router()


router.post('/signup', signUpContoller)
router.post('/signin', signInController)
router.delete('/signout', signOutController)
router.get('/getDetails/:id', getUserDetails)
router.put('/updateDetails/:id',updateUserDetails)


export default router