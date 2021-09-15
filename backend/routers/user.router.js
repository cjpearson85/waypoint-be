const userRouter = require('express').Router();
const {
  getUsers,
  getUserByUsername,
} = require('../controllers/userControllers');

userRouter.route('/').get(getUsers);
userRouter.route('/:username').get(getUserByUsername);

module.exports = userRouter;
