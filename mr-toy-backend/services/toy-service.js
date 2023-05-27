const fs = require('fs');
let gToys = require('../data/toy.json')
const PAGE_SIZE = 4

function query(filterBy = {}, sortBy = {}) {
    let toysToDisplay = gToys
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (filterBy.inStock === 'true' || filterBy.inStock === 'false') {
        toysToDisplay = toysToDisplay.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }
    if (filterBy.labels) {
        toysToDisplay = toysToDisplay.filter(toy => filterBy.labels.some(l => toy.labels.includes(l)))
    }
    const pageCount = Math.ceil(toysToDisplay.length / PAGE_SIZE)

    toysToDisplay = _getSortedToys(toysToDisplay, sortBy)

    if (filterBy.pageIdx !== undefined) {
        let startIdx = filterBy.pageIdx * PAGE_SIZE
        toysToDisplay = toysToDisplay.slice(startIdx, startIdx + PAGE_SIZE)
    }

    const data = { toysToDisplay, pageCount }
    return Promise.resolve(data)
}

function get(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = gToys[idx]
    gToys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = gToys.find(currToy => currToy._id === toy._id)
        toyToUpdate.name = toy.name
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.createdAt = toy.createdAt
        toyToUpdate.price = toy.price
        toyToUpdate.imgUrl = toy.imgUrl
        if (toy.labels) {
            toyToUpdate.labels = [...toy.labels]
        }
    } else {
        toy._id = _makeId()
        gToys.push(toy)
    }
    return _saveToysToFile().then(() => toy)
}

function _getSortedToys(toysToDisplay, sortBy) {
    console.log('sotyBy:', sortBy)
    sortBy.desc = -1
    if (sortBy.type === 'name') {
        console.log('sorting by name')
        toysToDisplay.sort((t1, t2) => {
            if (t1.name < t2.name) return -1
            if (t1.name >= t2.name) return 1
        })
    } else {
        toysToDisplay.sort((b1, b2) => (sortBy.desc) * (b2[sortBy.type] - b1[sortBy.type]))
    }
    return toysToDisplay
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(gToys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err)
            }
            console.log('The file was saved!')
            resolve()
        })
    })
}

module.exports = {
    query,
    get,
    remove,
    save
}