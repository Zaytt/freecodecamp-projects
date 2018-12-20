const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

//Get

router.get('/user/:userId(*)', controller.getUser);
router.get('/users', controller.getAllUsers);
router.get('/log', controller.getUserLog);

//Post
router.post('/new-user', controller.createUser);
router.post('/add', controller.addExercise);


module.exports = router;