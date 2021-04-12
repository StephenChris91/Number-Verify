//get the needed elements

const userInput = document.querySelector('.number');
const verifyBtn = document.querySelector('.verify-btn');
const notNum = document.querySelector('.not-number');
const tooShort = document.querySelector('.number-too-short');


//add event listeners
userInput.addEventListener('change', verifyInput)
verifyBtn.addEventListener('click', verifyNum)


//API ENDPOINT



//create functions
function verifyInput(e){
    let userNum = e.target.value;    

    if(userNum.length < 11){
        tooShort.innerHTML = 'Minimum number length should be 11';
        notNum.innerHTML = 'This is not a number'
    }else if(isNaN(userNum)){
        notNum.innerHTML = 'This is not a number'
        tooShort.innerHTML = '';

    }else{ 
        console.log('All details are correct')
        tooShort.innerHTML = '';
        notNum.innerHTML = ''
        verifyNum()
    }
    userInput.value = '';
}


async function verifyNum(){
    let myKey ='B7FD7E04FDFE45EEB374E8D7F745B1EE'
    let apiURL = `https://api.veriphone.io/v2/verify?phone=${userInput.value}&key=${myKey}`
    try {
        const getNumData = await fetch(apiURL);
        const data = await getNumData.json()
        console.log(data)

    } catch (error) {
        console.log('theres an error: ', error)
    }
}

