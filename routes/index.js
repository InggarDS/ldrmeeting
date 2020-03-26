const router = require('express').Router();
const users = require('./user')
const group = require('./group')


router.use('/user', users)
router.use('/group', group)

module.exports = router