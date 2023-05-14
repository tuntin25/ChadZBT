const API_KEY = ''

const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')
const submitElement = document.querySelector('#submit')

submitButton.disabled = true

inputElement.addEventListener("input", function() {
    // Check the condition to enable or disable the button
    if (inputElement.value === "") {
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
    }
  });

inputElement.addEventListener("keydown", function(event) {
    // Check if the "Enter" key was pressed
    if (event.keyCode === 13) {
      // Cancel the default action of the event
      event.preventDefault();
  
      // Trigger a click on the button element
      submitButton.click();
    }
  });

function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage(){
    const options = {
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100
        })
    }
    

    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if(data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click',()=> changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    
    }catch (error){ 
        console.log(error)
    }
}



submitButton.addEventListener('click',getMessage)

function clearInput(){
    inputElement.value = ''
    outPutElement.textContent = ''
}

buttonElement.addEventListener('click',clearInput)