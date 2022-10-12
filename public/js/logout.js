const logOutEl = document.querySelector("#logout-link");

// ------------------------- FUNCTIONS

// log out of account and destroy session, redirect to login page
const logOutOfAccount = async() => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
};

// ------------------------- EVENT LISTENERS

logOutEl.addEventListener("click", logOutOfAccount);