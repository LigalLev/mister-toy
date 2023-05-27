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
    getDefaultSortBy,
    getImgUrl,
}

function query(filterBy = {}, sortBy = {}) {
    return httpService.get(BASE_URL, { filterBy, sortBy })
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
    console.log('toy:', toy)
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: ['Kids'],
        inStock: true,
        imgUrl: ''
    }
}

function getImgUrl(imgUrl){
    const tempUrl = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    if (imgUrl) return imgUrl
    return tempUrl
    
}

function getDefaultFilter() {
    return {}
}
function getDefaultSortBy() {
    return { type: 'name' }
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
