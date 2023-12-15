import express from 'express';
import userRouter from './userRoutes.js';
import dashboardRouter from './dashboardRouter.js';
import friendsRoutes from './friendsRoutes.js';
import groupsRoutes from './groupsRoutes.js';
import expenseRoutes from './expenseRoutes.js';

const router = express.Router();

router.get('/api', (req, res) => {
      //console.log("Manan is here api router");
      if (req.isAuthenticated()) {
        return res.json({ isAuthenticated: true, user: req.user });
      } else {
        return res.json({ isAuthenticated: false, user: null });
      }
});
    

export default (app) => {
      app.use('/api/user', userRouter);
      app.use('/api/dashboard', dashboardRouter);
      app.use('/api/friends', friendsRoutes);
      app.use('/api/groups', groupsRoutes);
      app.use('/api/expense', expenseRoutes);
}