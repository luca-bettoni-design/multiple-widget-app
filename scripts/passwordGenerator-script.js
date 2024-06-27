const passwordBox = document.getElementById("id-password-input");
const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789";
const symbols = "@#$%&?^*+-/=";
const allCharacters = upperCase + lowerCase + numbers + symbols;

function generatePassword(){
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    while(length > password.length){
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
    passwordBox.value = password;
}

function copyPassword(){
    passwordBox.select();
        navigator.clipboard.writeText(passwordBox.value).then(function() {
            console.log('Password copiata con successo!');
        }).catch(function(error) {
            console.error('Errore nel copiare la password: ', error);
        });
}