const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { has } = require('lodash');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : "5432",
      user : 'postgres',
      password : 'P@ssw0rd',
      database : 'smart-brain'
    }
  });
// const db = require("./data/db.js");

const app = express();
let date_time = new Date();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res)=> {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    const { email, name, password } = req.body;
    // bcrypt.compare("apples", '$2a$10$nI.C/Z3FlZzIKDlTUxr4QOHb7rNrDxnrt49r4voPPXndmay.XejvO', function(err, res) {
    //     console.log('first guess', res);
    // });
    // bcrypt.compare("not_bacon", '$2a$10$nI.C/Z3FlZzIKDlTUxr4QOHb7rNrDxnrt49r4voPPXndmay.XejvO', function(err, res) {
    //     console.log('second guess', res);
    // });

    knex.select('email')
        .from('users')
        .where('email',email)
        .returning('email')
        .then( (email) => {
            if(email.length == 0){
                res.status(404).json("User is not found!");
            }
            else {
                usersPromise = knex.select('*')
                                .from('users')
                                .where('email',email)
                                .returning('*')

                                knex.select('hash')
                                .from('login')
                                .where('email',email)
                                .returning('hash')
                                .then( (hash) => {
                                    try{
                                        bcrypt.compare(req.body.password, hash[0].hash, function(err, resp) {
                                            console.log('password is  :',resp);
                                            if(resp){
                                                usersPromise.then( (all) => {
                                                    console.log(all[0]);
                                                    res.json(all[0]);
                                                } );
                                            }
                                        });
                                    }
                                    catch(err)
                                    {
                                        console.log('User is not found');
                                    }
                                })
                                        }
        });
    
    
    // if (mailExists != null &&
    //     req.body.password === database.users[0].password)
    //     {
    //         res.json(database.users[0]);
    //     } else {
    //         res.status(403).json('incorrect user or password');
    //         console.log('incorrect user or password')
    //     }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            knex('login').insert({
                hash: hash,
                email: email
            }).returning('email')
            .then( (email) => {
                console.log('mail registered', email);
            })
        });
    });
    knex('users').insert({
        email: email, 
        name: name, 
        entries: 15, 
        created_on: new Date().toISOString()
        })
        .returning('name')
        .then( (name) => {
            res.json(name[0]);
        })
        .catch( () => {
            res.status(400).json("dublicate user unable to register");
        })
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    knex.select('*')
        .from('users')
        .where('id', id)
        .returning('*')
        .then( (all) => {
            if(all.length != 0){
                res.status(200).json(all[0]);
            }
            else {
                res.status(400).json('No user registered with this id');
            }
                
        })
        .catch( () => {
            res.status(400).json('No user registered with this id');
        })
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;  
            return res.json(user.entries);   
                  
        }
    });
    if (! found) {
        res.status(404).json('user not found');
    }
})

app.listen(3000, () => {
    console.log("app is running on port 3000")
})



// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//     // res === true
// });