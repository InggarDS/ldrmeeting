const { User, UserGroup, Group } = require('../models')

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

    static addMemberForm(req, res){ 

        let id = req.params.groupId
        User.findAll()
        .then((data) => {
            
            Group.findAll({
                where : { id : id },
                include : [{
                    model : User
                }]
            })
            .then((group) => {
                
                 res.render('addMember', { data, id , group})
            })
           
        })
        .catch((err) => {

            res.send(err)
        })

    }

    static addMember(req, res){

        let data = {
            UserId : +req.body.member,
            GroupId : +req.body.idgroup
        }

        console.log(data);
        
        UserGroup.create( { data } )
        .then(() => {
            
            Group.findAll({
                where : { id : req.body.idgroup },
                include : [{
                    model : User
                }]
            })
            .then((group) => {

                res.render('addMember', { group })
            })
        })
        .catch((err) => {
            res.send(err)
        })

    }

}

module.exports = Controller