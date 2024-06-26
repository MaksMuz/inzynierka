const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../DB_models/user_model');
var nodemailer = require('nodemailer');

var client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'TestoweNodeMailer@gmail.com', // Your email address
        pass: '#Node442Mailer!' // Your password
    },
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User();
    user.userName = userData.name;
    user.userLastName = userData.lastName;
    user.userEmail = userData.email;
    user.userPassword = userData.password;
    user.picture = user.avatar();
    // call setPassword function to hash
    user.setPassword(userData.password);
    user.save((error, registeredUser) => {
        if ( error ) {
            return res.status(400).send('Failed to add user.');
        } else {
            let token = jwt.sign(registeredUser._id.toString(), config.SECRET);
            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    //find user with email
    User.findOne({userEmail: userData.email}, (error, user) => {
        if(error) {
            res.status(400).send('Something go wrong');
        } else {
            if(!user) {
                res.status(401).send('Invalid email');
            } else
            if ( !user.validPassword(userData.password)) {
                res.status(401).send('Invalid password');
            } else {
                let token = jwt.sign(user._id.toString(), config.SECRET)
                res.status(200).send({
                    'token': token,
                    'userData': {
                        'name': user.userName,
                        'lastName': user.userLastName,
                        'email': user.userEmail
                    }
                });
            }

        }
    });
});

router.post('/resetpassword', (req, res) => {
    let userData = req.body;
    User.findOne({ userEmail: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).send('something go wrong with /resetpassword');
        } else {
            if (!user) {
                res.status(401).send('User with that email was not found'); // Return error if email is not found in database
            } else {
                user.resettoken = jwt.sign( user._id.toString(), config.SECRET); // Create a token for activating account through e-mail
                // Save token to user in database
                user.save(function(err) {
                    if (err) {
                        res.status(400).send('Problem with save user with resettoken'); // Return error if cannot connect
                    } else {
                        // Create e-mail object to send to user
                        let email = {
                            from: 'Inzynierka, TestoweNodeMailer@gmail.com@gmail.com',
                            to: user.userEmail,
                            subject: 'Reset Password Request',
                            text: 'Hello ' + user.userName + ', You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/login/resetpassword/' + user.resettoken,
                            html: 'Hello<strong> ' + user.userName + '</strong>,<br><br>You recently request a password reset link. Please click on the link below to reset your password:<br><br><a href="http://localhost:4200/login/resetpassword/' + user.resettoken + '">http://localhost:4200/login/resetpassword/</a>'
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function(err, info) {
                            if (err) {
                                res.status(400).send('problem with sending email');// If error with sending e-mail, log to console/terminal
                            } else {
                                res.status(200).send({message: 'sent to: ' +user.userEmail}); // Log e-mail
                            }
                        });
                        res.status(200).send({message: 'Please check your e-mail for password reset link'}); // Return success message
                    }
                });
            }
        }
    });
});

router.put('/resetpassword/:token', function(req, res) {
    User.findOne({ resettoken: req.params.token }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(400).send('something go wrong with /resetpassword/:token');
        } else {
            var resettoken = req.params.token; // Save user's token from parameters to variable
            // Function to verify token
            jwt.verify(resettoken, config.SECRET, function(err, decoded) {
                    if (err) {
                        res.status(400).send('Token is invalid');
                    } else {
                        if (!user) {
                            res.status(400).send('No one user has that token');
                        } else {
                            if (req.body.password === null || req.body.password === '') {
                                res.status(400).send('Password not provided');
                            } else {
                                user.userPassword = req.body.password; // Save user's new password to the user object
                                user.setPassword(req.body.password);
                                user.resettoken = false; // Clear user resettoken
                                // Save user's new data
                                user.save((error, updateUser) => {
                                    if ( error ) {
                                        return res.status(400).send('Failed to update user.');
                                    } else {
                                        res.status(200).send({message:'Password changed'});
                                    }
                                });
                            }
                        }
                    }
                });
        }
    });
});

module.exports = router;
