// write your code here

const ramenMenu = document.querySelector("div#ramen-menu")
const ramenDetail = document.querySelector("div#ramen-detail")
const ramenRatingForm = document.querySelector("#ramen-rating")

function fetchAllRamens(){
console.log("HAPPENED")
fetch("http://localhost:3000/ramens")
.then(r => r.json())
.then(ramens => {
    ramens.forEach(ramen => {
        renderRamen(ramen)
    })
})
}

fetchAllRamens()

function renderRamen(ramen){
    const img = document.createElement("img")
    img.src = ramen.image
    img.alt = ramen.name

    const detailImage = document.querySelector(".detail-image")
    const name = document.querySelector(".name")
    const restaurant = document.querySelector(".restaurant")

    img.addEventListener('click', ()=> {
        resetRamenMenu()
        fetchAllRamens()
        ramenRatingForm.dataset.id = ramen.id

        detailImage.src = ramen.image
        detailImage.alt = ramen.name
        name.textContent = ramen.name
        restaurant.textContent = ramen.restaurant

        ramenRatingForm.rating.value = ramen.rating
        ramenRatingForm.comment.value = ramen.comment
    })

    ramenMenu.append(img)
}

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
    })
})

function resetRamenMenu(){
    ramenMenu.innerHTML = ""
}