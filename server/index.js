const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();

// controller imports
const PC = require('./controllers/postController');
const AC = require('./controllers/authController');

// general server setup w/session and database
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7
    }
}))
massive(CONNECTION_STRING)
.then(db =>{
    console.log('Database connection successful!')
    app.set('db', db)
})
.catch(()=>{console.log('Database connection failed...')})

// -----------------ENDPOINTS---------------------
app.post('/auth/register', AC.register)
app.post('/auth/login', AC.login)
app.get('/auth/logout', AC.logout)
app.get('/auth/user', AC.getUser)

app.get('/api/posts', PC.getMessages)
app.post('/api/post', PC.postMessage)
// app.put('/api/post/:post_id', PC.editMessage)
app.get('/api/post/:title', PC.searchMessages)

// DEFAULT
app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`)
})