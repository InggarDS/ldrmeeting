const router = require('express').Router();
const controller = require('../controllers/group')


router.get('/add/:id', controller.addForm)
router.post('/add', controller.add)
router.get('/member/:groupId', controller.addMemberForm)
router.post('/member', controller.addMember)
router.post('/member/invite', controller.invite)

module.exports = router