//get the needed elements

const userInput = document.querySelector('.number');
const verifyBtn = document.querySelector('.verify-btn');
const notNum = document.querySelector('.not-number');
const tooShort = document.querySelector('.number-too-short');
const resultContainer = document.querySelector('.result-container')


//add event listeners
userInput.addEventListener('change', verifyInput)
verifyBtn.addEventListener('click', verifyNum)

//Globals 

let result = {};
//API ENDPOINT



//create functions
function verifyInput(e){
    let userNum = e.target.value;    

    if(userNum.length < 11 || userNum.length > 11){
        tooShort.innerHTML = 'Minimum number length should be 11';
        notNum.innerHTML = 'This is not a number'
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


async function verifyNum(){
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

function displayData (){
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

    resultContainer.appendChild(status)
    resultContainer.appendChild(phoneNum)
    resultContainer.appendChild(type)
    resultContainer.appendChild(region)
    resultContainer.appendChild(carrier)
    resultContainer.appendChild(prefix)
}

