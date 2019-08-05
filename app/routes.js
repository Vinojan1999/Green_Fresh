const mongoose = require('mongoose');
var checkout       = require('./models/checkout');


// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });

/////////////////----Log-out-----////////////////

    app.get('/index', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/contact', function(req, res) {
        res.render('contact.ejs'); // load the index.ejs file
    });

    // app.get('/checkout', function(req, res) {
    //     res.render('checkout.ejs'); // load the index.ejs file
    // });

    app.get('/about', function(req, res) {
        res.render('about.ejs'); // load the index.ejs file
    });

    app.get('/services', function(req, res) {
        res.render('services.ejs'); // load the index.ejs file
    });

    app.get('/vegetables', function(req, res) {
        res.render('vegetables.ejs'); // load the index.ejs file
    });

    app.get('/fruits', function(req, res) {
        res.render('fruits.ejs'); // load the index.ejs file
    });

    app.get('/season', function(req, res) {
        res.render('season.ejs'); // load the index.ejs file
    });

    app.get('/kitchen', function(req, res) {
        res.render('kitchen.ejs'); // load the index.ejs file
    });

    app.get('/events', function(req, res) {
        res.render('events.ejs'); // load the index.ejs file
    });

    app.get('/mail', function(req, res) {
        res.render('mail.ejs'); // load the index.ejs file
    });

    app.get('/payment', function(req, res) {
        res.render('payment.ejs'); // load the index.ejs file
    });

    // app.get('/checkout', function(req, res) {
    //     res.render('checkout.ejs'); // load the index.ejs file
    // });
    // app.get('checkout.ejs', function(req, res) {
    //     res.render('checkout.ejs'); // load the index.ejs file
    // });

    app.get('/faqs', function(req, res) {
        res.render('faqs.ejs'); // load the index.ejs file
    });

    app.get('/privacy', function(req, res) {
        res.render('privacy.ejs'); // load the index.ejs file
    });

    app.get('/drinks', function(req, res) {
        res.render('drinks.ejs'); // load the index.ejs file
    });

    app.get('/single', function(req, res) {
        res.render('single.ejs'); // load the index.ejs file
    });

    ///////////////////////////////////////////////////////////////////




    //////////////////////---Logged-In---//////////////////////////////



    app.get('/success',isLoggedIn, function(req, res) {
        res.render('success.ejs', {
          user : req.user
        });
     });

    // app.get('/checkout', isLoggedIn, function(req, res) {
    //     res.render('checkout.ejs' ,{
    //       user : req.user
    //     }); // load the index.ejs file
    // });

    app.get('/single-product', isLoggedIn, function(req, res) {
        res.render('single-product' ,{
          user : req.user
        }); // load the index.ejs file
    });

        app.get('/category', function(req, res) {
            res.render('category.ejs', {
              user : req.user
            });
            // load the index.ejs file
        });

    app.get('/cart', isLoggedIn, function(req, res) {
        res.render('cart.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
      // FACEBOOK ROUTES =====================
      // =====================================
      // route for facebook authentication and login
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
      }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/',
              failureRedirect : '/login',
              failureFlash : true // allow flash messages
          }));

          // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        // send to google to do the authentication
        // profile gets us their basic information including their name
        // email gets their emails
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
                passport.authenticate('google', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                    }));





        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/checkout', function(req, res) {


      var newcheckout = new checkout();
      newcheckout.firstName = req.body.firstName;
      newcheckout.lastName = req.body.lastName;
      newcheckout.email = req.body.email;
      newcheckout.nic = req.body.nic;
      newcheckout.address = req.body.address;
      newcheckout.phonenumber = req.body.phonenumber;
      newcheckout.model = req.body.model;
      newcheckout.no= req.body.no;
      newcheckout.fdate= req.body.fdate;
      newcheckout.udate = req.body.udate;
      newcheckout.ins= req.body.ins;
      newcheckout.tax= req.body.tax;
      newcheckout.carId = req.body.carId;




          });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
