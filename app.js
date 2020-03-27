const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const router = require('./routes')
const session = require('express-session')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))


app.use(session({
    key : 'user_id',
    secret: 'xksjdsdi93eik',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expires: 600000 
    }
}))

//ingat urutan
app.use(router)



app.listen(port, () => {
    console.log('connecting to', port);
    
})