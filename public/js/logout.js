const logOutEl = document.querySelector("#logout-link");

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

logOutEl.addEventListener("click", logOutOfAccount);