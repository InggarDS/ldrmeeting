const { User, Group, UserGrup } = require('../models')
const sendEmail = require('../helpers/sendEmail')

class Controller {


    static registerForm(req, res){

        let msg = req.app.locals.message || ''
        delete req.app.locals.message 

        res.render('register', { msg })

    }

    static loginForm(req, res){

        res.render('login')
    }

    static register(req, res){

        const { username, email, password, confirm } = req.body;

        if ( password === confirm ){

            User.findOne({
                where : { username }
            })
            .then((data) => {

                if(!data){
                    const data = { username, email, password }
                    User.create(data)
                    .then(() => {
                        
                        req.app.locals.message = 'Thanks for signing up, please check your email for confirmation'
                        
                        sendEmail(email)
                        
                        res.redirect('/user/register')
                    })
        
                    .catch((err) => {
                        res.send(err)
                    })
                } else {
                    
                    req.app.locals.message = 'username already exist'
                    
                    res.redirect('/user/register')
                }
            })

        } else {
            req.app.locals.message = 'confirmasi tdk valid'
            res.redirect('/user/register')
        }
    }

    static login(req, res){

        const { username, password } = req.body
                
        User.findOne({
            where : { username, password }
        })
        .then((data) => {

            if (data){
                
                req.session.user = username
                const { user } = req.session

                User.findAll({
                    where : {
                        username : user
                    }, include : [{
                        model : Group
                    }]
                })
                .then((datas) => {
                //    res.send(datas[0].Groups[0])
                    
                   res.render('dashboard', {data, user, datas })
                })

            } else {
                res.redirect('/user/login')
            }
            
        })

    }

    static dashboard(req, res){

        const { user } = req.session

        User.findOne({
            username : user
        })
        .then((data) => {

            User.findAll({
                where : {
                    username : user
                }, include : [{
                    model : Group
                }]
            })
            .then((datas) => {

                res.render('dashboard', {data, user, datas })
            })
                 
            
           
        
        })

    }
    
    static logout(req, res){
        if (req.session.user) {
            req.session.destroy((err) => {   
                res.redirect('/user/login')
            })

        }
    }

    // router.get('/group/member/:groupId', controller.addMemberForm)

    static addMemberForm(req, res){ 

        User.findAll()
        .then((data) => {
            
            res.render('addMember', { data })
        })
        .catch((err) => {

            res.send(err)
        })

    }

    static addMember(req, res){



    }


}

module.exports = Controller