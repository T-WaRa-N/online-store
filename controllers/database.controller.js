const StoreUser = require('../models/registered.user.model')  //import new user model
const StoreProduct = require('../models/product.model')  //import product model
const jwt = require('jsonwebtoken')  //requiring jwt

// Storage controllers create and save new user to the database
exports.create = (req, res) => {
    const{ username, password } = req.body
    let registeringUser = new StoreUser({
        username: username,
        password: password
    })
    registeringUser.save((err, data) => {
        if(err){
            console.log(err)
            res.status(500).send({ "message": "Some error occurred while creating the user." })
        }else{
            res.send({ "message": "You have registered successfully" })
        }
    })

}

exports.findUser = (req, res) => {
    StoreUser.find(function(err, users){
        if(err){
            console.log(err);
            res.status(500).send({ "message": "Some error occurred while retrieving user credentials." })
        }else{
            res.send({"users": users})
        }
    })
}

exports.findOnlineProducts = function(req, res) {
    StoreProduct.find(function(err, products) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving user credentials." })
        } else {

            const auth = req.headers['authorization']
            const token = auth.split(' ')[1]
            const tokenParsed = JSON.parse(token)  
            
            //valid token enables a user to be able to buy from the store
            try{
                const decode = jwt.verify(tokenParsed, "pad-lock")

                res.send({'items': products})
               
            }catch(err){
                console.log(err)
            }
                        
            
        }
    });
}

exports.logged = (req, res)=>{
    const{ username, password } = req.body
    StoreUser.find((err, users)=>{
        if(err){ 
            //error handling
            console.log(err)
            res.status(500).send({ "message":"Error occured while retrieving user credenetials" })
        }else{ 
            //setting array of usernames and passwords respectively
            const usernames = users.map((obj) => { return obj.username })
            const passwords = users.map((obj) => { return obj.password })
            
            // For Aunthetication 
            if(usernames.includes(username) && passwords.includes(password)){
                
                if(username == "admin") {
                    const payload = {"name": username, "admin": true}
                    console.log("Admin has signed in")
                    // Token Generation
                    const token = jwt.sign(JSON.stringify(payload), 'pad-lock', { algorithm:'HS256' })
                    res.json({ "token": token, "isLoggedIn": true, "payload": payload })
                }else{
                    const payload = { "name": username, "admin": false }
                    console.log("Normal user has signed in")
                    // Token Generation
                    const token = jwt.sign(JSON.stringify(payload), 'pad-lock', { algorithm:'HS256' })
                    res.send({ "token": token, "isLoggedIn": true, "payload": payload })
                }   

                
            }else{
                res.send({ "error": "Incorrect, recheck your username or password"})
            }
        }
        
    })
}