import items from "./gallery-items.js"

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const createList = (array) => array.map(({preview, original, description}) => {
    const listItem = document.createElement('li')
    const listItemLink = document.createElement('a')
    const listItemImg = document.createElement('img')
    listItemLink.setAttribute('href', original)
    listItemImg.setAttribute('src', preview)
    listItemImg.setAttribute('data-source', original)
    listItemImg.setAttribute('alt', description)
    listItem.classList.add('gallery__item')
    listItemLink.classList.add('gallery__link')
    listItemImg.classList.add('gallery__image')
    listItemLink.appendChild(listItemImg)
    listItem.appendChild(listItemLink)
    return listItem
});

const galleryRef = document.querySelector('.js-gallery')
const galleryItems = createList(items)
galleryRef.append(...galleryItems)
// console.log(galleryItems)
// console.log(galleryRef)
 
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryRef.addEventListener('click', getLargePicture)

function getLargePicture(event) {
    event.preventDefaulf()
    if (event.target.nodeName !== 'IMG') {
        return
    }
    // const lagrePicture = event.target.dataset.source
    console.log(event.target)
    console.log (event.target.dataset.source)
}