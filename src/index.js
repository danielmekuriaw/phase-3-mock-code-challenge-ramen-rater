// write your code here

const ramenMenu = document.querySelector("div#ramen-menu")
const ramenDetail = document.querySelector("div#ramen-detail")
const ramenRatingForm = document.querySelector("#ramen-rating")

function fetchAllRamens(){
    resetRamenMenu()
    fetch("http://localhost:3000/ramens")
    .then(r => r.json())
    .then(ramens => {
        const firstRamen = ramens[0]
        renderRamenDetail(firstRamen)
        ramens.forEach(ramen => {
            renderRamen(ramen)
        })
    })
}

fetchAllRamens()

function fetchCurrentRamens(ramenObj){
    resetRamenMenu()
    fetch("http://localhost:3000/ramens")
    .then(r => r.json())
    .then(ramens => {
        displayedRamen = ramens.find((ramen)=> {return ramen.id === ramenObj.id})
        console.log(displayedRamen)
        renderRamenDetail(displayedRamen)

        ramens.forEach(ramen => {
            renderRamen(ramen)
        })
    })
}

const deleteBtn = document.createElement("button")
deleteBtn.textContent = "Delete"

function renderRamen(ramen){
    const img = document.createElement("img")
    img.src = ramen.image
    img.alt = ramen.name

    img.addEventListener('click', ()=> {
        renderRamenDetail(ramen)
    })

    ramenMenu.append(img)
}

const detailImage = document.querySelector(".detail-image")
const name = document.querySelector(".name")
const restaurant = document.querySelector(".restaurant")

function renderRamenDetail(ramen){
    const div = document.createElement("div")
    deleteBtn.dataset.id = ramen.id
    ramenRatingForm.dataset.id = ramen.id

    detailImage.src = ramen.image
    detailImage.alt = ramen.name
    name.textContent = ramen.name
    restaurant.textContent = ramen.restaurant

    ramenRatingForm.rating.value = ramen.rating
    ramenRatingForm.comment.value = ramen.comment

    //div.append(ramenRatingForm)
    div.append(deleteBtn)
    ramenDetail.append(div)
}

deleteBtn.addEventListener('click', () => {
    fetch(`http://localhost:3000/ramens/${deleteBtn.dataset.id}`, {
        method: "DELETE"
    }).then(_ => {
        fetchAllRamens()
    }
    )
})

ramenRatingForm.addEventListener('submit', (event)=> {
    event.preventDefault()

    let updates = {
        "rating": event.target.rating.value,
        "comment": event.target.comment.value
    }
    
    console.log(ramenRatingForm.dataset.id)
    
    fetch(`http://localhost:3000/ramens/${ramenRatingForm.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updates)
    }).then(r => r.json())
    .then(ramen => {fetchCurrentRamens(ramen)})
})

function resetRamenMenu(){
    ramenMenu.innerHTML = ""
}

const newRamenForm = document.querySelector("#new-ramen")

newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target[4].value
    }

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamen)
    }).then(r => r.json())
    .then(ramen => {
        fetchCurrentRamens(ramen)
    })  

    newRamenForm.reset()
})