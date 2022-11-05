// This project is designed to display pictures of zoo animals 
// It also has a form so that you can add animals to the list, 
// add some likes to a particular animal, and delete an animal from the list.

// Mouseover event listeners for the header.
let h1 = document.querySelector('h1')
h1.addEventListener('mouseover', function () {
    h1.style.color = "grey"
})
h1.addEventListener('mouseout', function () {
    h1.style.color = "black"
})

// Submit event listener to add pictures of zoo animals.
document.querySelector('#animal-form').addEventListener('submit',
    handleSubmit)

// Event handler
function handleSubmit(event) {
    event.preventDefault()
    let animalObject = {
        name: event.target.name.value,
        class: event.target.class.value,
        lifespan: event.target.lifespan.value,
        image_link: event.target.image_link.value,
        likes: 0

    }
    buildAnimal(animalObject)
    addAnimal(animalObject)

}

//DOM Function to build a list of animals
function buildAnimal(animal) {
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
        <img src="${animal.image_link}"
        <div class="content">
            <h4>${animal.name}</h4>
            <p>Animal Class - ${animal.class}</p>
            <p>Life Span - ${animal.lifespan}</p>
            <p><b>Likes - <span class="like-count">${animal.likes}</span></b></p>
        </div>
        <div class="buttons">
            <button id = 'likes'> Likes </button>
            <button id = 'delete'> Delete </button>
            <br><br>
        </div>   
     `
    // Click event listener to add the number of likes to the animals
     card.querySelector('#likes').addEventListener('click', () => {
        animal.likes += 1
        card.querySelector('span').textContent = animal.likes
        updateLikes(animal)
    })

    // Click event listener to delete an animal from the list.
    card.querySelector('#delete').addEventListener('click', () => {
        card.remove()
        deleteAnimal(animal.id)
    })

    //Adds a list of animals to the DOM
    document.querySelector('#animal-list').appendChild(card)

}

// FETCH REQUESTS
// GET - Display all pictures of zoo animals.
function getAnimals() {
    fetch('http://localhost:3000/zooAnimals')
        .then(response => response.json())
        .then(allAnimals => allAnimals.forEach(animal => buildAnimal(animal)))
}

// POST - Create/add pictures of zoo animals.
function addAnimal(animalObject) {
    fetch('http://localhost:3000/zooAnimals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObject)
    })
        .then(response => response.json())
        .then(animal => console.log(animal))

}

// PATCH - updates the number of likes of zoo animals.
function updateLikes(animalObject) {
    fetch(`http://localhost:3000/zooAnimals/${animalObject.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObject)
    })
        .then(response => response.json())
        .then(animal => console.log(animal))
}

// DELETE - remove pictures of zoo animals.
function deleteAnimal(id) {
    fetch(`http://localhost:3000/zooAnimals/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(animal => console.log(animal))
}

// Get animal data and render the animals to the DOM.
function initialize() {
    getAnimals()
}

// Calls the function - initialize.
initialize()
