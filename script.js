let sliderMoment = document.querySelector('#sliderforwordcount');

sliderMoment.addEventListener('input',function () {
    document.querySelector('#counter').innerText = sliderMoment.value;
}, false);

let totalCheckBoxes = 0;
let checkBoxes = [0,0,0,0];


// The below code to detect the checkbox click and update
let capitalChecked = document.querySelector('#checkForCapital');
capitalChecked.addEventListener('change',function () {
    if (capitalChecked.checked){
        totalCheckBoxes++;
        checkBoxes[0] = 1;
    }
    else {
        totalCheckBoxes--;
        checkBoxes[0] = 0;
    }

})

let smallChecked = document.querySelector('#checkForSmall');
smallChecked.addEventListener('change',function () {
    if (smallChecked.checked){
        totalCheckBoxes++;
        checkBoxes[1] = 1;
    }
    else {
        totalCheckBoxes--;
        checkBoxes[1] = 0;
    }
    
})

let numbersChecked = document.querySelector('#checkForNumbers');
numbersChecked.addEventListener('change',function () {
    if (numbersChecked.checked){
        totalCheckBoxes++;
        checkBoxes[2] = 1;
    }
    else {
        totalCheckBoxes--;
        checkBoxes[2] = 0;
    }
    
})

let symbolsChecked = document.querySelector('#checkForSymbols');
symbolsChecked.addEventListener('change',function () {
    if (symbolsChecked.checked){
        totalCheckBoxes++;
        checkBoxes[3] = 1;
    }
    else {
        totalCheckBoxes--;
        checkBoxes[3] = 0;
    }
    
})


//Function to generate some random number between minimum and max

function generateRandomInteger(a,b){
    let x = Math.random()*(b-a);
    x += a;
    return Math.floor(x);
}



//function to generate a random integer from 0 to 9, to use for numbersChecked function

function generateSingleNumber() {
    return generateRandomInteger(0,9);
}


//function to generate a random capital alphabet, using ascii values

function generateSingleCapital() {
    let temp = generateRandomInteger(65,90);
    return String.fromCharCode(temp);
}

//function to generate a random small alphabet, using ascii values

function generateSingleSmall() {
    let temp = generateRandomInteger(97,122);
    return String.fromCharCode(temp);
}


//function to generate random character using custom array

function generateRandomSymbol() {
    let arrOfElements = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".", "/",":",";","<","=",">","?","@"];
    return arrOfElements[generateRandomInteger(0,arrOfElements.length)];
}


//Now using above functions, we would generate the password of that length, password generator function,
//But this would be called on addEventListener by click button action of generate password

function passwordGenerator() {
    if (totalCheckBoxes==0) return;
    let len = document.querySelector('#counter').innerText;
    if (totalCheckBoxes>len) return;
    let tempPassword = "";
    let tempPasswordLength = 0;
    let arrayOfActiveFunctions = [];
    if (checkBoxes[0]==1) arrayOfActiveFunctions.push(0);
    if (checkBoxes[1]==1) arrayOfActiveFunctions.push(1);
    if (checkBoxes[2]==1) arrayOfActiveFunctions.push(2);
    if (checkBoxes[3]==1) arrayOfActiveFunctions.push(3);
    console.log(arrayOfActiveFunctions);
    let passwd_strength = passwdStrength(len, arrayOfActiveFunctions.length);

    while(tempPasswordLength!=len){
        let temp = generateRandomInteger(0,arrayOfActiveFunctions.length);
        if (arrayOfActiveFunctions[temp] == 0) tempPassword = tempPassword.concat(generateSingleCapital());
        else if (arrayOfActiveFunctions[temp] == 1) tempPassword = tempPassword.concat(generateSingleSmall());
        else if (arrayOfActiveFunctions[temp] == 2) tempPassword = tempPassword.concat(generateSingleNumber());
        else tempPassword = tempPassword.concat(generateRandomSymbol());
        tempPasswordLength++;
    }
    return tempPassword;
}


//event listener -> When generate password button clicked, call generatepassword() and display in password box

let passWdButton = document.querySelector('#generatePasswdButton');
let passwdDisplay = document.querySelector('#passwordDisplay');
passWdButton.addEventListener('click', function() {
    let temp = passwordGenerator();
    passwdDisplay.value = temp;
})

//password strength function

function passwdStrength(pass_len , np_of_actives ) {
    let score = 0;
    score += 2*(pass_len);
    score += 30*(np_of_actives);
 
    if(score<50) document.querySelector(".dot").style.backgroundColor = "red";
    else if (score>=50 && score<=80) document.querySelector(".dot").style.backgroundColor = "yellow";
    else document.querySelector(".dot").style.backgroundColor = "green";

}


let copyBtn = document.getElementById("passwdCopy");
let copyMsg = document.querySelector('.copied_popup');

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwdDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.style.scale = 1;
    setTimeout( () => {
        copyMsg.style.scale = 0;
    },2000);
    

}
