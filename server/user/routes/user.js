const express = require("express");
const signupModal = require("../modals/signup-modal");
const {checkExistingUser, generatePasswordHash} = require("../utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res)=> {
    signupModal.find({email: req.body.email}).then((userData)=> {
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});

router.post("/signup", async (req, res)=> {
    if(await checkExistingUser(req.body.email)) {
        res.status(400).send("Username exist. Please try with different username");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            signupModal.create({email: req.body.email,
                            password: passwordHash})
                            .then(()=> { 
                                res.status(200).send(`${req.body.email} added successfully`); 
                            }).catch((err)=> {
                                res.status(400).send(err.message)
            })
        });
    }
    
});

router.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});

router.put("/updatepassword", (req, res)=> {
    signupModal.find({email: req.body.email}).then((user)=> {
        if(user.length) {
            bcrypt.compare(req.body.oldpassword, user[0].password).then((isMatch)=> {
                if(isMatch) {
                    generatePasswordHash(req.body.newpassword).then((hashedPassword)=> {
                        signupModal.updateOne({email: req.body.email}, {password: hashedPassword}).then(()=> {
                            res.status(200).send("Password updated Successfully")
                        }).catch((err)=> {
                            res.status(400).send(err)
                        })
                    })
                    
                } else {
                    res.status(400).send("Old password is incorrect")
                }
            })
        } else {
            res.status(400).send("Invalid User")
        }
    })
});
///old password    /new //username

module.exports = router;