const User = requrie('../models/users');

class User {
    
    static addUser(obj){
        return User.create();
    }
}