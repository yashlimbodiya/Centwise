import express from 'express';
import * as friendsController from '../controllers/friendsController.js';
const router = express.Router();

router.post('/addFriend', friendsController.addFriend);


export default router;