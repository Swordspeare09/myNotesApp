// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local"),
    function(req, res) {
      res.json(req.user);
    }
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/notes", function(req, res) {
    console.log(req.body);
    console.log(req.user);
    console.log(req.body.category);
    db.note
      .create({
        body: req.body.text,
        UserId: req.user.id,
        category: req.body.category
      }).then(function(data){
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/notes", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea

      db.note.findAll({
        where: {UserId: req.user.id}
      }).then(function(data){
        res.json(data);
      });
    }
  }
  );
  
  // DELETE route for deleting posts
  app.delete("/api/notes/:id", function (req, res) {
    db.note.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (data) {
        res.json(data);
      });
  });

};

