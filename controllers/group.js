const { User, UserGroup, Group } = require('../models')
const sendAppointment = require('../helpers/sendEmailAppointment')

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
                where : { id : +req.body.idgroup },
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

    static invite(req, res){
        //console.log(req.body.idgroup);
         Group.findAll({
                where : { id : +req.body.groupId },
                include : [{
                    model : User
                }]
            })
            .then((group) => {
                
               // const { user } = req.session

                console.log(user);
               sendAppointment(req.body.title, req.body.date, req.body.time, group)

                //res.redirect('/group/member/', req.body.idgroup)
            })
        .catch((err) => {
            res.send(err)
        })
    
        // <label for="title">Topic : </label>
        // <input type="text" name="topic"><br>
        // <label for="date">date : </label>
        // <input type="date" data-date-inline-picker="true" name="date"><br>
        // <label for="time">Time : </label>
        // <input type="time" name="time" value="23.00"><br><br>
        // <input type="submit" value = "send to all member">
    }

}

module.exports = Controller