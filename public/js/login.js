// button and switch variables
const loginBtn = document.querySelector("#login-button");
const signupBtn = document.querySelector("#signup-button");
const switchToSignUp = document.querySelector(".switch-to-signup");
const switchToLogIn = document.querySelector(".switch-to-login");

// ------------------------- FUNCTIONS

// function to log in to an existing account
const logInToAccount = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// function to sign up a new user
const signUpForAccount = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// function to display login form, hide signup form
function displayLoginForm(){
  document.querySelector("#signup-display").style.display = "none";
  document.querySelector("#login-display").style.display = "block";
}

// function to display signup form, hide login form
function displaySignupForm(){
  document.querySelector("#signup-display").style.display = "block";
  document.querySelector("#login-display").style.display = "none";
}

// ------------------------- EVENT LISTENERS

// event listeners to either get or create a user
loginBtn.addEventListener("click", logInToAccount);
signupBtn.addEventListener("click", signUpForAccount);

// event listeners to switch between different forms
switchToLogIn.addEventListener("click", displayLoginForm);
switchToSignUp.addEventListener("click", displaySignupForm);