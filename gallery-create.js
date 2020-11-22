import galleryItems from "./gallery-items.js"

const galleryRef = document.querySelector('.js-gallery')
const largeImage = document.querySelector('.lightbox__image')
const wrapper = document.querySelector('.lightbox') 
const overlayRef = document.querySelector('.lightbox__overlay')
const btnClose = document.querySelector('button[data-action="close-lightbox"]')
let currentIndex
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const createList = (array) => array.map(({preview, original, description}, index) => {
    const listItem = document.createElement('li')
    const listItemLink = document.createElement('a')
    const listItemImg = document.createElement('img')
    listItemLink.setAttribute('href', original)
    listItemImg.setAttribute('src', preview)
    listItemImg.setAttribute('data-source', original)
    listItemImg.setAttribute('data-index', index)
    listItemImg.setAttribute('alt', description)
    listItem.classList.add('gallery__item')
    listItemLink.classList.add('gallery__link')
    listItemImg.classList.add('gallery__image')
    listItemLink.appendChild(listItemImg)
    listItem.appendChild(listItemLink)
    return listItem
});

const gallery = createList(galleryItems)
galleryRef.append(...gallery)

 
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryRef.addEventListener('click', onClick)


function onClick (event) {
    event.preventDefault()
    const imageRef = event.target

    if (imageRef.nodeName !== 'IMG') {
        return
    }
    
    currentIndex = Number(event.target.dataset.index)
    const lagreImageURL = event.target.dataset.source
    const lagreImageAlt = event.target.alt
    const lagreImageIndex = event.target.dataset.index
    onModalOpen()

    // Подмена значения атрибута src элемента img.lightbox__image.
    largeImage.src = lagreImageURL
    largeImage.alt = lagreImageAlt
    largeImage.setAttribute('data-id', lagreImageIndex)
 }



   
// Открытие модального окна по клику на элементе галереи.
function onModalOpen() {
    // Закрытие модального окна по нажатию клавиши ESC.
    window.addEventListener('keydown', onPressEsc)
    window.addEventListener('keydown', onLeftRightPress)
  
    wrapper.classList.add('is-open')
    
    }

    // Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
    btnClose.addEventListener('click', onModalClose)

    function onModalClose() {
        window.removeEventListener('keydown', onPressEsc)
         window.removeEventListener('keydown', onLeftRightPress)
        wrapper.classList.remove('is-open')

        // Очистка значения атрибута src элемента img.lightbox__image.
        clearSource()
    }

    // Очистка значения атрибута src элемента img.lightbox__image.
    // Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

    function clearSource() {
        largeImage.src = ''
        // imageRef.classList.('current')
    }

    // Закрытие модального окна по клику на div.lightbox__overlay.
    overlayRef.addEventListener('click', onOverlayClick)
    function onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            onModalClose()
        }
    }

    // Закрытие модального окна по нажатию клавиши ESC.
    function onPressEsc(event) {
        if (event.code === 'Escape') {
            onModalClose()
        }
    }

    // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
function onLeftRightPress(event) {
    
    if (event.code === 'ArrowRight') {
        if (currentIndex === galleryItems.length-1) {
             currentIndex = 0
        } else {
            currentIndex += 1
        } 
        //  largeImage.src = (currentIndex === galleryItems.length) ? galleryItems[0].original : galleryItems[currentIndex+1].original
    } else if (event.code === 'ArrowLeft') {
         if (currentIndex === 0) {
             currentIndex = galleryItems.length-1
        } else {
            currentIndex -= 1
        } 
        //   largeImage.src = (currentIndex === 0) ? galleryItems[galleryItems.length-1].original : galleryItems[currentIndex-1].original
    } 
    
    largeImage.src = galleryItems[currentIndex].original
    }







   
   