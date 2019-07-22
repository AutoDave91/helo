const bcrypt = require('bcrypt')

const register = async (req,res) => {
    const db = req.app.get('db'),
        { username, password, profile_pic } = req.body.userPass;
        console.log('AC6: ', password)
        // console.log('AC7: ', req.body, req.params)
    const result = await db.get_user([ username ])
    const existingUser = result[0]

    if(existingUser) {
        return res.status(409).send('Username taken, try again')
    }

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)
    const registeredUser = await db.register_user([ username, hash, profile_pic ])
    const user = registeredUser[0]
    if(user) {
        req.session.user = { username: user.username, id: user.id, profile: user.profile_pic }
    }
    

    return res.status(201).send(req.session.user)
}

const login = async (req,res) => {
    const db = req.app.get('db'),
    { username, password } = req.body.userPass;
    // console.log('AC30: ', req.body)
    console.log('AC31: ', req.body.userPass)

    const foundUser = await db.get_user([username]);
    console.log('AC34: ', foundUser)
    const user = foundUser[0];

    if (!user) {
        return res.status(401).send('User not found. Please register as a new user before logging in.');
    }

    const authenticated = bcrypt.compareSync(password, user.password);
    if (!authenticated) {
        return res.status(403).send('Incorrect password');
    }

    req.session.user = { id: user.user_id, username: user.username, profile: user.profile_pic };
    console.log('AC47: ', req.session.user)
    return res.send(req.session.user);
}
async function logout(req, res){
    req.session.destroy();
    console.log('logged out')
    return res.status(200).send(req.session);
}
async function getUser(req, res){
    console.log('AC56: ', req.session)
    // console.log('AC55: ', req.session.user)
    if(req.session.user){
        console.log('AC60: hit')
        res.json(req.session.user)
    } else {
        res.status(401).json(console.log('no user found'))
    }
}
// const session = async (req,res) => {
//     const db = req.app.get('db'),
//     { username } = req.session.user;

//     const foundUser = await db.get_user([username]);
//     const user = foundUser[0];
//     if (req.session) {
//         req.session.user = { id: user.id, username: user.username, profile: user.profile_pic };
    
//         return res.send(req.session.user);
//     }
// }

module.exports = {
    register, login, getUser, logout
}