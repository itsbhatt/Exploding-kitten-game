const express = require('express');
const router = express.Router();

const { index, create, update } = require('./controllers/UserController');

//user routes
router.get('/users', index);

router.post('/users', create);

router.put('/user/:username', update);

module.exports = router;
