const { UserGroup, Group } = require('../models')

class Controller {
   
    static addForm(req, res){
        
        const id  = req.params.id
        
        res.render('addGroup', { iduser : id }  )

    }

    static add(req, res) {

        let data = {
            name : req.body.name
        }
        console.log(req.body.iduser);
        

       Group.create( data )
       .then((group) => {
        
         let dt = {
             UserId : +req.body.iduser,
             GroupId : +group.id
         }         
            UserGroup.create(dt)
            .then(() => {
                
                res.redirect('/user/dashboard')

            })
            .catch((err) => {
                res.send(err)
            })
       })
       .catch((err) => {
           res.send(err)
       })
        


    }

}

module.exports = Controller