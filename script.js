//SELECTORS
const ballSelector = document.querySelector('#ball');
const inputSelector = document.querySelector("#input");
const answerSelector = document.querySelector("#answer_letters");
const buttonSelector =document.querySelector('#button');
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

const disableButton = () =>{
    buttonSelector.setAttribute('disabled', 'disabled');
};

const cleanResponse = () =>{
    setTimeout(()=>{
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        buttonSelector.removeAttribute('disabled');
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
    if (!inputSelector.value) return;
    disableButton();
    ballSelector.classList.add('shake__ball');

    fetch(`${API_ENDPOINT}`)
        .then((response)=> response.json())
        .then(data =>showAnswer(data.answer));
}

//to enter key
const handleKeyEnter= e =>{

    if(e.keyCode===13){
        fetchAnswer();
}
};
//click button
buttonSelector.addEventListener('click',()=>{
        fetchAnswer();
});

