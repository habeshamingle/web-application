const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/home');


/* GET home page. */
router.get('/', ctrlMain.home);

router.get('/register', ctrlMain.register);
router.post('/register', ctrlMain.doRegister);

router.get('/login', ctrlMain.login);

module.exports = router;