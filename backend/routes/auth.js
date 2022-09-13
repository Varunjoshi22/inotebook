const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = 'VarunJoshiisaverygood$developer';//this is used to jwt token to complete the verification of the user

//Route1:- Create a user: Post "/api/auth/createuser" this is the endpoint where we want to hit it. Doesn't require the authentication

router.post('/createuser', [//we are using it under an empty array all the constraints or the checks are been perfomed
    body('name', 'Enter a valid name').isLength({ min: 3 }),//after comma we can add the message
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })

], async (req, res) => {
    //if there are error bad request are been sent 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {//this is try and catch error 

        //check whether the user exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "A user already exists with this email" })
        }

        //salt is an element which will be added in the pasword where password is generally stored in the form of hash code so we will just add the salt(a predefined random characters to solve the problem) at the end.
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt) // we use await because it returns the promise to us where it returns promise we must use the await function
        user = await User.create({
            //thiss is the promise we take that the given info passes the conditions
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // .then(user => res.json(user))
        // .catch(err => {//.catch is used to tell what the error is in console and the json as well
        //     console.log(err)
        //     res.json({ error: "Please enter a valid email", message: err.message })
        // })
        // this response will be shown in the thunder client and as well as check for the body in thunder client 
        const data = {//here we use data to compare that user is the one which have registered not any one else
            user: {//id is fastest way to recogize the user. also called as "PAYLOAD"
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);// we don't use await because it is synchronus

        // res.json(user)
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})

// Authenticate the user: Post "/api/auth/login" this is the endpoint where we want to hit it. Doesn't require the authentication

//Route 2

router.post('/login', [//same thing is been done which we did up
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {

    //if there are error bad request are been sent 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // requesting user from the body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Try to login with correct credentials" })

        }
        let passwrodCompare = await bcrypt.compare(password, user.password)
        if (!passwrodCompare) {
            return res.status(400).json({ error: "Try to login with correct credentials" })
        }
        const data = {//same we did up "PAYLOAD"
            user: {//id is fastest way to recogize the user.
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Occured")

    }

})

// Route 3: Get Loggedin User details using Post "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Occured")

    }


})


module.exports = router