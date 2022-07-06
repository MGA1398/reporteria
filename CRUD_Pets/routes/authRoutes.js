const Users = require('../controllers/authController');
module.exports = (router) => {
    //Create new User
    router.post('/register', Users.createUser);
    //Login User
    router.post('/login', Users.loginUser);
    //Get Users
    router.get('/users', Users.findAll);
    //Delete User
    router.delete('/user/:id', Users.delete);
}
