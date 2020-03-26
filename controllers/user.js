const { User, Group, UserGrup } = require('../models')

class Controller {


    static registerForm(req, res){

        res.render('register')

    }

    static loginForm(req, res){

        res.render('login')
    }

    static register(req, res){

        const { username, email, password, confirm } = req.body;

        if ( password === confirm ){

            const data = { username, email, password }
            User.create(data)
            .then(() => {
                
                res.redirect('/user/register')
            })

            .catch((err) => {
                res.send(err)
            })
        } else {
            res.send('password tidak boleh sama')
        }
    }

    static login(req, res){

        const { username, password } = req.body
                
        User.findOne({
            where : { username, password }
        })
        .then((data) => {
            
            
            req.session.user = data.username


            if (data){
                const { user } = req.session
                res.render('dashboard', { user })

            } else {
                // req.session.user = user.dataValues;
                res.redirect('/user')
            }
            
        })

    }

    static dashboard(req, res){

        const { user } = req.session
       res.render('dashboard', { user })

    }
    
    static logout(req, res){
        if (req.session.user) {
            
            req.session.destroy((err) => {   
                res.redirect('/user/login')
            })

        }
    }


}

module.exports = Controller