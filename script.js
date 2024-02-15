const data = document.querySelector('.data');
const password = document.querySelector('.password');
const logInButton = document.querySelector('.logIn');
const validation = document.querySelector('.validation');

logInButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let info = {
        data: (data.value),
        password: (password.value)
    }

    fetch('/', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then(response =>{
        return response.json()
    })
    .then(data=>{
        let incorrectPassword = data.mensaje;
        validation.textContent = incorrectPassword;
        validation.style.color = "red";
        setTimeout(function() {
            validation.textContent = "";
        },3000)
    })
    .catch(e => {
        console.log(e)
    })
    data.value = "";
    password.value = "";
});