const router = require('express').Router();
const controller = require('../controllers/user')



router.get('/dashboard', (req,res,next) => {
    
    if(req.session.user){
        next()
    } else {

        res.redirect('/user/login/')
    }

}, controller.dashboard)

router.get('/register', controller.registerForm)
router.get('/login', controller.loginForm)
router.post('/add', controller.register)
router.post('/login', controller.login)
router.get('/logout', controller.logout)


module.exports = router