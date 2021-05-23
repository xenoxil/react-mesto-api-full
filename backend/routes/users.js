const router = require('express').Router();
const { avatarValidation, userValidation, userIdValidation } = require('../middlewares/validation');
const { getUsers, getUserById, getMyInfo, updateAvatar, updateUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyInfo);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', userValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
