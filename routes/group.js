const router = require('express').Router();
const controller = require('../controllers/group')


router.get('/add/:id', controller.addForm)
router.post('/add', controller.add)

module.exports = router