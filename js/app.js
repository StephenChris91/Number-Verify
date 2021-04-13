//get the needed elements

const userInput = document.querySelector('.number');
const verifyBtn = document.querySelector('.verify-btn');
const notNum = document.querySelector('.not-number');
const tooShort = document.querySelector('.number-too-short');
const resultContainer = document.querySelector('.result-container')
const body = document.querySelector('#body')
const darkSwitch = document.querySelector('.checkbox')


//add event listeners
userInput.addEventListener('change', verifyInput)
verifyBtn.addEventListener('click', verifyNum)
darkSwitch.addEventListener('click', switchMode)

//Globals 

let result = {};
//API ENDPOINT



//create functions
function verifyInput(){
    let userNum = userInput.value;    

    if(userNum.length < 11 || userNum.length > 11){
        tooShort.innerHTML = 'Minimum number length should be 11';
        notNum.innerHTML = 'This is not a number'
        resultContainer.innerHTML = '';
    }else if(isNaN(userNum) && userNum.length < 11){
        notNum.innerHTML = 'This is not a number'
        tooShort.innerHTML = '';

    }else{ 
        console.log('All details are correct')
        tooShort.innerHTML = '';
        notNum.innerHTML = '';
        verifyNum();
    }
    userInput.value = '';
}


function displayData (){
    resultContainer.innerHTML = '';

    const div = document.createElement('div')
    div.setAttribute('class', 'data')
    
    const status = document.createElement('p')
    status.innerHTML = `Validity: ${result.phone_valid}`;
    const phoneNum = document.createElement('p')
    phoneNum.innerText = `Phone Number: ${result.phone}`;
    const type = document.createElement('p')
    type.innerText = `Phone Type: ${result.phone_type}`;
    const region = document.createElement('p')
    region.innerText = `Country: ${result.phone_region}`;
    const carrier = document.createElement('p')
    carrier.innerText = `Network: ${result.carrier}`;
    const prefix = document.createElement('p')
    prefix.innerText = `Country Code: ${result.country_prefix}`;

    div.appendChild(status)
    div.appendChild(phoneNum)
    div.appendChild(type)
    div.appendChild(region)
    div.appendChild(carrier)
    div.appendChild(prefix)

    resultContainer.appendChild(div)
    tooShort.innerHTML = '';
    notNum.innerHTML = '';
}


async function verifyNum(){
    const userText = userInput.value;
    console.log(userText)
    if(!userText || userText.length < 11 || userText.length > 11 && isNaN(userText)){
        tooShort.innerHTML = 'Minimum number length should be 11';
        notNum.innerHTML = 'This is not a number'
        resultContainer.innerHTML = '';
    }else{
        let myKey ='B7FD7E04FDFE45EEB374E8D7F745B1EE'
        let apiURL = `https://api.veriphone.io/v2/verify?phone=${userInput.value}&key=${myKey}`
        try {
            const getNumData = await fetch(apiURL);
            result = await getNumData.json()
            console.log(result)
            displayData()

        } catch (error) {
            console.log('theres an error: ', error)
    }
    }
    
    
}

function switchMode(){
    console.log('clicked the toggle switch')
    body.classList.toggle('dark-mode')
}



