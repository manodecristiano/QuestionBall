//SELECTORS
const ballSelector = document.querySelector('#ball');
const inputSelector = document.querySelector("#input");
const answerSelector = document.querySelector("#answer_letters");
const buttonSelector =document.querySelector('#button');
const errorSelector =document.querySelector('#error');
// API
const API_ENDPOINT = 'https://yesno.wtf/api';

/** 
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */
//FLAGS:
let isRequestInProgress = false;



const showError=() =>{
    errorSelector.innerHTML="You need to type your question";
    setTimeout(() =>{
        errorSelector.innerHTML="";    
    },3000);
};


const disableButton = () =>{
    buttonSelector.setAttribute('disabled', 'disabled');
    inputSelector.setAttribute('disabled', 'disabled');
    
};

const cleanResponse = () =>{
    setTimeout(()=>{
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        buttonSelector.removeAttribute('disabled');
        inputSelector.removeAttribute('disabled');
        isRequestInProgress=false;
    },3000);
};

const showAnswer = answer =>{
    setTimeout(() =>{
        
            answerSelector.innerHTML = `<p>${answer}</p>`;
            ballSelector.classList.remove('shake__ball');
            cleanResponse();
    },1000);
    
};

const fetchAnswer=()=>{
    isRequestInProgress=true;
    disableButton();
    ballSelector.classList.add('shake__ball');

    fetch(`${API_ENDPOINT}`)
        .then((response)=> response.json())
        .then(data =>showAnswer(data.answer));
}

//to enter key
const handleKeyEnter= e =>{
    if(isRequestInProgress)return;
    if(e.keyCode===13){
        fetchAnswer();
}
};
//click button
buttonSelector.addEventListener('click',()=>{
    if(isRequestInProgress)return;
    if (!inputSelector.value) return showError();
        fetchAnswer();
});

