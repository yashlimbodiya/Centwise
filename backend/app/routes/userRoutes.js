

import express from 'express';
import passport from 'passport';
import multer from 'multer';
import * as userController from '../controllers/userControllers.js';

const router = express.Router();
const upload = multer(); 



router.get('/signin', userController.signin);
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/user/signin'}, 
), userController.createSession);

router.post('/localLogin', passport.authenticate(
  'local',
  {failureRedirect: '/user/signin'}, 
), userController.localLogin);

router.post('/create', userController.create);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/ProfilePicture'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  },
});

// Set up Multer with the configured storage
const fileUpload = multer({ storage: storage });

// Route for uploading a file
router.post('/uploadfile', upload.single('file'), userController.create);
router.get('/checkAuth', userController.checkAuth);
router.get('/signout', userController.sessionDestroy);

router.post('/forgotpassword', userController.forgotPassword);
router.post('/inviteFriend', userController.inviteFriend);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/api/user/signin'}), userController.createSession);

export default router;
