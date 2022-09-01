const router = require('express').Router();
const userRoute = require('./users');
const cardRoute = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRoute);
router.use('/cards', auth, cardRoute);

module.exports = router;
