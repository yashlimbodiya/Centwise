import express from 'express';
import * as friendsController from '../controllers/groupsController.js';
const router = express.Router();

router.post('/createGroup', friendsController.createGroup);


export default router;