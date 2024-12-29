import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


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
    getPriceLabel,
    getInventoryLabel,
    saveToyMsg,
    removeToyMsg,
    getEmptyMsg,
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
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
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
        name: utilService.makeLorem(),
        price: utilService.getRandomIntInclusive(),
        labels: utilService.makeLabels(),
        createdAt: Date.now(),
        inStock: utilService.getRandomInStock()
    }
}

function getToyLabels() {
    return [...labels]
}

function getPriceLabel(toys) {
    const priceLabel = {}
    toys.forEach(toy => {
        toy.labels.forEach(label => {
            if (!priceLabel[label]) priceLabel[label] = 0
            priceLabel[label] += toy.price
        })
    })
    return _getPricePerLabel(priceLabel)
}

function getInventoryLabel(toys) {
    const labelMap = {}

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            if (!labelMap[label]) labelMap[label] = { inStock: 0, total: 0 }
            labelMap[label].total++
            if (toy.inStock) labelMap[label].inStock++
        })
    })
    
    return _getInventoryLabel(labelMap)
}


function _getPricePerLabel(priceLabel) {
    return Object.keys(priceLabel).map(label => ({
        label,
        total: priceLabel[label]
    }))
}

function _getInventoryLabel(labelMap) {
    return Object.entries(labelMap).map(([label, { inStock, total }]) => ({
        label,
        inStockPercentage: ((inStock / total) * 100).toFixed(2),
    }))
}

async function saveToyMsg(toyId, msgToSave) {
    try {
        return await httpService.post(`toy/${toyId}/msg`, _createMsg(msgToSave))
    } catch (err) {
        console.error('Failed to save message', err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        return await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    } catch (err) {
        console.error('Failed to remove toy message', err)
        throw err
    }
}

function getEmptyMsg() {
    return {
        id: utilService.makeId(),
        txt: '',
        by: '',
        createdAt: Date.now(),
    }
}

function _createMsg(msgToSave) {
    return {
        id: utilService.makeId(),
        txt: msgToSave.txt,
        by: msgToSave.by,
        createdAt: msgToSave.createdAt,
    }
}

