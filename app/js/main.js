/* main.js
Created by: Kirill Volodkin
Date: 2019-09-29
The purpose of the script is to prompt user about all password criteria, and 
having received the answers, generate the password corresponding to the criteria selected
*/

// functions to get and validate user input. If user input does not pass validation, notify user and try again

var inputLength = function () {
    var pwdLength = window.prompt("Please input password length. It must be a number between 8 and 128.");
    if (pwdLength >= 8 && pwdLength <= 128) {
        return pwdLength;
    }
    else {
        window.alert("Wrong input! Must be a number between 8 and 128");
        return inputLength();
    }
}

var confirmTypes = function () {
    var confirmSpecial = window.confirm("Will your password contain special characters?");
    var confirmNumeric = window.confirm("Will your password contain numeric characters?");
    var confirmLowerCase = window.confirm("Will your password contain lowercase characters?");
    var confirmUpperCase = window.confirm("Will your password contain uppercase characters?");
    if (confirmSpecial||confirmNumeric||confirmLowerCase||confirmUpperCase) {
        return [confirmSpecial, confirmNumeric, confirmLowerCase, confirmUpperCase];
    }
    else {
        window.alert("You must select at least one character type! Let's try again!");
        return confirmTypes();
        }
}

// functions to generate character set and password

var generateCharSet = function (types) {
    allLower = 'abcdefghijklmnopqrstuvwxyz';
    allUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    allSpecial = '!@#$^&%*()+=-[]\/{}|:<>?,.';
    allNumbers = '1234567890';
    charSet = '';
    types[0] ? charSet = charSet + allSpecial : charSet = charSet;
    types[1] ? charSet = charSet + allNumbers : charSet = charSet;
    types[2] ? charSet = charSet + allLower : charSet = charSet;
    types[3] ? charSet = charSet + allUpper : charSet = charSet;
    return charSet;
}

var generatePwd = function (pwdLength, charSet) {
    pwd = '';
    for (i = 0; i <= pwdLength - 1; i++) {
        pwd = pwd + charSet[Math.floor(Math.random() * charSet.length)];
    }
    return pwd;
}

// functions for buttons

var buttonGeneratePwd = function () {
    pwdLength = inputLength();
    types = confirmTypes();
    charSet = generateCharSet(types);
    pwd = generatePwd (pwdLength, charSet);
    document.getElementById("output").innerHTML = pwd;
}

var buttonCopy = function () {
    var output = document.getElementById("output");
    console.log(output);
    output.select();
    output.setSelectionRange(0, 99999); //for mobile devices
    document.execCommand("copy");
    window.alert("Password copied to the clipboard!");
}

// actual code of the page

document.getElementById("generate_button").onclick = buttonGeneratePwd;

document.getElementById("copy_button").onclick = buttonCopy;




