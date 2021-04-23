let stateSelect = document.querySelector('#state-choice')
let factDisplay = document.querySelector('#fact-display')
let getFactButton = document.querySelector('#get-fact')

let apiUrlBase = 'https://state-facts.herokuapp.com/api'

let pageReady = false   // set to true once list of states is loaded. 
// button event handler will check this to ensure it 

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

        pageReady = true  
    })
    .catch( err => {
        console.error(err)
        alert('Sorry, could not fetch the list of states.')
    })


// Create event handler for button 

getFactButton.addEventListener('click', function() {
    if (!pageReady) {
        return    // wait for list to be loaded from API
    } 

    let state = stateSelect.value 
    if (state) {   // make sure something is selected 
        getFact(state)
    }
    
})


function getFact(state) {
    // example: https://state-facts.herokuapp.com/api/fact/Minnesota
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