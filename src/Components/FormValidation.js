const inputUsername = document.getElementById("userInput");
const inputPassword = document.getElementById("passwordInput");
const inputConfirmPassword = document.getElementById("passwordInput1");
  
const form = document.getElementById("form");
const button = document.getElementById("submit");
const errorElement = document.getElementById("error");

form.addEventListener('submit', (e) => {
    let messages = []

    var alphanumeric = '/^[0-9a-zA-Z]+$/';
    
    if (
      inputUsername.value.trim() !== "" ||
      inputUsername.value == null ||
      inputPassword.value.trim() !== "" ||
      inputPassword == null ||
      inputConfirmPassword == null ||
      inputPassword.value === inputConfirmPassword ||
      inputUsername.value.match(alphanumeric))
    {
      messages.push('Something needs to be fixed')

    }

    if(messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ')
    }
  })