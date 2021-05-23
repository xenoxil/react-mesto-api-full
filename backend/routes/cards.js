const router = require('express').Router();
const { cardIdValidation, cardBodyValidation } = require('../middlewares/validation');
const { deleteCard, getCards, createCard, dislikeCard, likeCard } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', cardIdValidation, deleteCard);

router.post('/', cardBodyValidation, createCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
