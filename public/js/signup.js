$(document).ready(function() {
  // Getting references to our form and input
  var signUpbutton = $("#sign_up");
  var emailInput = $("#userEmail");
  var passwordInput = $("#userPassword");
  var nameInput = $("#userName");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpbutton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.name) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
  });


  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, name) {
    $.post("/api/signup", {
      email: email,
      password: password,
      name: name
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up an alert (bulma)
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
