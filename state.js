let loadingMessage = document.querySelector('#loading')
let stateApp = document.querySelector('#state-facts')

let stateSelect = document.querySelector('#state-choice')
let factDisplay = document.querySelector('#fact-display')
let getFactButton = document.querySelector('#get-fact')

let apiUrlBase = 'https://state-facts.azurewebsites.net/api'

enablePage(false)   // show loading message while page loads 

function enablePage(enabled) {
    if (enabled) {
        loadingMessage.style.display = 'none'  
        stateApp.style.visible = 'block'
    } else {
        loadingMessage.style.display = 'block'  
        stateApp.style.visible = 'none'
    }

}

// load list of states 
let stateListApiUrl = `${apiUrlBase}/state-list`
fetch(stateListApiUrl)
    .then( response => response.json() )
    .then( stateList => {

        stateList.forEach( state => {
            // create an option element for each state in the list 
            let stateOption = document.createElement('option')
            stateOption.value = state
            stateOption.innerHTML = state 
            stateSelect.appendChild(stateOption)
        })

        enablePage(true)  // remove loading message and show page 
    })
    .catch( err => {
        console.error(err)
        alert('Sorry, could not fetch the list of states.')
    })


// Create event handler for button 

getFactButton.addEventListener('click', function() {
    let state = stateSelect.value 
    if (state) {   // make sure something is selected 
        getFact(state)
    }    
})


function getFact(state) {
    // example: https://state-facts.azurewebsites.net/api/fact/Minnesota
    let stateFactApiUrl = `${apiUrlBase}/fact/${state}`
    fetch(stateFactApiUrl)
        .then( response => response.json() )
        .then( factObject => {
            let fact = factObject.fact 
            factDisplay.innerHTML = fact 
        })
        .catch( err => {
            console.error(err)
            alert('Sorry, could not fetch a fact.')
        })
}