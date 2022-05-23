// As a user, I want to be able to see a list of zoo animals so that I can
// add another animal to the list, add some likes to a particular animal and
// delete an animal from my list.


// Mouseover event
let h1 = document.querySelector('h1')
h1.addEventListener('mouseover', function(){
  h1.style.color = "grey"
})
h1.addEventListener('mouseout', function(){
  h1.style.color = "black"
})

// Submit event
    document.querySelector('#animal-form').addEventListener('submit',
        handleSubmit)
    
    function handleSubmit(e) {
        e.preventDefault()
        let animalObj = {
            name: e.target.name.value,
            class: e.target.class.value,
            lifespan: e.target.lifespan.value,
            image_link: e.target.image_link.value,
            likes: 0
    
        }
        buildAnimal(animalObj)
        addAnimal(animalObj)
    
    }
    //});
    
    //DOM Functions & Click event
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
        card.querySelector('#likes').addEventListener('click', () => {
            animal.likes += 1
            card.querySelector('span').textContent = animal.likes
            updateLikes(animal)
        })
    
        card.querySelector('#delete').addEventListener('click', () => {
            card.remove()
            deleteAnimal(animal.id)
        })
        //Add card to the DOM
        document.querySelector('#animal-list').appendChild(card)
    
    }
    
    // fetch requests
    // fetch for all zoo animals
    function getAnimals() {
        fetch('http://localhost:3000/zooAnimals')
            .then(res => res.json())
            .then(allAnimals => allAnimals.forEach(animal => buildAnimal(animal)))
    }
    
    function addAnimal(animalObj) {
        fetch('http://localhost:3000/zooAnimals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalObj)
        })
            .then(res => res.json())
            .then(animal => console.log(animal))
            
    }
    
    function updateLikes(animalObj) {
        fetch(`http://localhost:3000/zooAnimals/${animalObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalObj)
        })
            .then(res => res.json())
            .then(animal => console.log(animal))
    }
    
    function deleteAnimal(id) {
        fetch(`http://localhost:3000/zooAnimals/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(animal => console.log(animal))
    }
    
    function initialize() {
        getAnimals()
    }
    
        initialize()
    