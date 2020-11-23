const dogFilter = document.querySelector("#good-dog-filter")
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

function fetchDogs (){
    dogBar.innerHTML = ""
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(dogsArray => dogsArray.forEach(renderDogs))
}

fetchDogs()

//On page load, make a fetch to get all of the pup objects.
//add a span with the pup's name to the dog bar (ex: <span&gt;Mr. Bonkers&lt;/span>).

function renderDogs(dogObj){
    const span = document.createElement("span")
    span.innerHTML = `${dogObj.name}`
    dogBar.append(span)

    dogBar.addEventListener("click", function(event){
        dogInfo.innerHTML = ""
        if (event.target.textContent === `${dogObj.name}`){
            console.log(dogObj)
            fetch(`http://localhost:3000/pups/${dogObj.id}`)
            .then(resp => resp.json())
            .then(dogData => renderOneDog(dogData))  
        }
    })
}

function renderOneDog(dogData){
    // console.log("Works?")
    const img = document.createElement("img")
    img.src = dogData.image
    
    const name = document.createElement("h2")
    name.textContent = dogData.name

    const button = document.createElement("button")
    button.className = "toggle"
    if (dogData.isGoodDog === true){
        button.textContent = "Good Dog!"
    } else if (dogData.isGoodDog === false) {
        button.textContent = "Bad Dog!"
    }
    
    dogInfo.append(img, name, button)

    const toggleButton = dogInfo.querySelector(".toggle")
    // console.log(toggleButton)
    toggleButton.addEventListener("click", function(event){
        if (event.target.textContent === "Good Dog!"){
            event.target.textContent = "Bad Dog!"
            console.log("Bad Dog!")
            postIsBadDog()
        } else if (event.target.textContent === "Bad Dog!"){
            event.target.textContent = "Good Dog!"
            console.log("Good Dog!")
            postIsGoodDog()
        }
    })

    function postIsBadDog(){
        fetch(`http://localhost:3000/pups/${dogData.id}`,{
            method: 'PATCH',
            headers: 
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": false
            })
        })
    }

    function postIsGoodDog(){
        fetch(`http://localhost:3000/pups/${dogData.id}`,{
            method: 'PATCH',
            headers: 
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": true 
            })
        })
    }
}



//- If the button now says "ON" (meaning the filter is on), 
//then the Dog Bar should only show pups whose isGoodDog attribute is true. 
//If the filter is off, the Dog Bar should show all pups (like normal).

dogFilter.addEventListener("click", function(event){
    if (event.target.textContent === "Filter good dogs: OFF"){
        event.target.textContent = "Filter good dogs: ON"
        filterOn()
    } else if (event.target.textContent === "Filter good dogs: ON") {
        event.target.textContent = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
            fetch(`http://localhost:3000/pups`)
            .then(r => r.json())
            .then(dogData => dogData.forEach(dog => {
                const span = document.createElement("span")
                span.textContent= dog.name
                dogBar.append(span)
            })
            )
    }
})
    
function filterOn(){
    dogBar.innerHTML = ""
    // console.log("filter on!")
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(dogsArray => dogsArray.forEach(goodDog))
}  


function goodDog(dogObj){
    
    if (dogObj.isGoodDog === true){
        const span = document.createElement("span")
        span.textContent = dogObj.name
        dogBar.append(span)
    }
}

// dogFilter.addEventListener("click", function(event){
//     if (event.target.textContent === "Filter good dogs: OFF"){
//         event.target.textContent = "Filter good dogs: ON"
//         fetch(`http://localhost:3000/pups`)
//         .then( r => r.json())
//         .then(dogData => {
//             dogBar.innerHTML = ""
//             dogData.forEach(dog => {
//                 if (dog.isGoodDog === true){
//                     const dogSpan = document.createElement('span')
//                     dogSpan.textContent = dog.name
//                     dogBar.append(dogSpan)
//                 }
//             })
//         })
//     } else if (event.target.textContent === "Filter good dogs: ON") {

//         event.target.textContent = "Filter good dogs: OFF"
//         fetch(`http://localhost:3000/pups`)
//         .then(r => r.json())
//         dogBar.innerHTML = ""
//         .then(dogData => dogData.forEach(dog => {
//             const span = document.createElement("span")
//             span.textContent= dog.name
//             dogBar.append(span)
//         })
//         )
//     }
// })


// function filterOff(){
//     console.log("filter off!")
//     fetch(`http://localhost:3000/pups`)
//     .then(resp => resp.json())
//     .then(dogsArray => dogsArray.forEach(allDogs))
// }  


// function allDogs(){
//     dogBar.innerHTML = ""
//     renderDogs()
// }
