import express from 'express';
import passport from 'passport';
import * as dashboardController from '../controllers/dashboardController.js';
const router = express.Router();

router.get('/', dashboardController.fetchAllData);
router.get('/userDetails', dashboardController.userDetails);
router.patch('/updateProfile/:userId', dashboardController.updateUserProfile);


export default router;