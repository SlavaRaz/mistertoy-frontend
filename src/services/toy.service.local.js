import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()


export const toyService = {
    query,
    getById,
    save,
    remove,
    getToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getToy() {
    return {
        name: utilService.makeLorem(),
        price: utilService.getRandomIntInclusive(),
        labels: utilService.makeLabels(),
        createdAt: Date.now(),
        inStock: utilService.getRandomInStock()
    }
}

// function getRandomToy() {
//     return {
//         name: utilService.makeId(),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         labels: labels.getRandomIntInclusive(1, 8),
//         createdAt: Date.now(),
//         inStock: ''
//     }
// }

function getDefaultFilter() {
    return {

        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
        sortBy: {
            type: '',
            desc: 1
        }
    }
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    console.log(toys)
    if (toys && toys.length > 0) return

    toys = []
    for (var i = 0; i < 12; i++) {
        const toy = getToy()
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}
