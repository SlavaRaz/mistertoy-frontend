export const utilService = {
    makeId,
    makeLorem,
    makeLabels,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    getRandomInStock
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 1) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function makeLabels(size = 4) {
    var words = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
    var txt = ''
    const array = []
    while (size > 0) {
        size--
        txt = words[Math.floor(Math.random() * words.length)] + ''
        array.push(txt)
    }
    console.log(array)
    return array
}
//*Optional to use random labels

// function getRandomLabels() {
//     const allLabels = ['Doll', 'Battery Powered', 'Baby', 'Educational', 'Fun', 'Outdoor'];
//     const labelCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 labels
//     return Array.from({ length: labelCount }, () => 
//         allLabels[Math.floor(Math.random() * allLabels.length)]
//     );
// }

function getRandomIntInclusive(min = 1, max = 100) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function getRandomInStock() {
    return Math.random() > 0.5; // Random boolean
}