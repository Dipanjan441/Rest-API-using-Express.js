import express from 'express';
import { dashboardController, dashboardJwtUserController, deleteUser, editUser, loginController, loginJwtUserController, registerJwtUserController, regUserController, updateUser, userLoginController, userSignupController } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login',userLoginController);
router.post('/signUp',userSignupController);
router.put('/editUser/:id',editUser);
router.put('/updateUser',updateUser);
router.delete('/deleteUser/:id',deleteUser);

//session login router
router.post('/check/register',regUserController);
router.post('/check/login',loginController);
router.get('/check/dashboard',dashboardController);

//jwt token login user
router.post('/jwt/register',registerJwtUserController);
router.post('/jwt/login',loginJwtUserController);
router.get('/jwt/dashboard',dashboardJwtUserController);

export default router;