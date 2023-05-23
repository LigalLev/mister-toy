import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
    // return storageService.query(STORAGE_KEY).then(toys => toys)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

    // return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)

    // return Promise.reject('Not now!')
    // return storageService.remove(STORAGE_KEY, toysId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: 22,
        lables: [],
        inStock: true,
    }
}

function createToy() {
    return {
        _id: utilService.makeId(),
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
function getDefaultFilter() {
    return { txt: '', isDone: undefined }
}

function createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true
            },
            {
                _id: 't102',
                name: 'Building Blocks',
                price: 45,
                labels: ['Blocks', 'Educational', 'Toddler'],
                createdAt: 1631031801022,
                inStock: true
            },
            {
                _id: 't103',
                name: 'Remote Control Car',
                price: 89,
                labels: ['Car', 'Battery Powered', 'Kids'],
                createdAt: 1631031801033,
                inStock: true
            },
            {
                _id: 't104',
                name: 'Stuffed Animal',
                price: 29,
                labels: ['Animal', 'Soft', 'Baby'],
                createdAt: 1631031801044,
                inStock: true
            },
            {
                _id: 't105',
                name: 'Puzzle Game',
                price: 19,
                labels: ['Puzzle', 'Educational', 'Kids'],
                createdAt: 1631031801055,
                inStock: true
            },
            {
                _id: 't106',
                name: 'Action Figure',
                price: 39,
                labels: ['Figure', 'Collectible', 'Kids'],
                createdAt: 1631031801066,
                inStock: true
            },
            {
                _id: 't107',
                name: 'Board Game',
                price: 59,
                labels: ['Game', 'Family', 'Kids'],
                createdAt: 1631031801077,
                inStock: true
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }

}
