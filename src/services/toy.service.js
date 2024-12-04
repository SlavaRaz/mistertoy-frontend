import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

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


function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: utilService.makeLabels(),
    }
}

function getToyLabels() {
    return [...labels]
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}
