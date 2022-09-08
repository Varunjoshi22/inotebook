const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user: Post "/api/auth/" this is the endpoint where we want to hit it. Doesn't require the authentication

router.post('/', [//we are using it under an empty array all the constraints or the checks are been perfomed
    body('name', 'Enter a valid name').isLength({ min: 3 }),//after comma we can add the message
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({//thiss is the promise we take that the given info passes the conditions
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(err => {//.catch is used to tell what the error is in console and the json as well
            console.log(err)
            res.json({ error: "Please enter a valid email", message: err.message })
        })
    // this response will be shown in the thunder client and as well as check for the body in thunder client 
})

module.exports = router