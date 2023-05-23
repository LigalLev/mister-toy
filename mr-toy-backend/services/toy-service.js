const fs = require('fs');
let gToys = require('../data/toy.json')
const PAGE_SIZE = 3

function query(filterBy = {}, sortBy) {
    let toysToDisplay = gToys
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (filterBy.labels) {
        const labels = filterBy.labels.split(',')
        // console.log('labels:', labels);
        toysToDisplay = toysToDisplay.filter(toy => labels.some(l => toy.labels.includes(l)))
        // ['famous', 'low']
    }
    // 14 / 3 = 4.6 => 5
    const pageCount = Math.ceil(toysToDisplay.length / PAGE_SIZE)

    toysToDisplay = getSortedToys(toysToDisplay, sortBy)

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
        if (toy.labels) {
            toyToUpdate.labels = [...toy.labels]
        }
    } else {
        toy._id = _makeId()
        gToys.push(toy)
    }
    return _saveToysToFile().then(() => toy)
}

function getSortedToys(toysToDisplay, sortBy) {
    toysToDisplay.sort((b1, b2) => (sortBy.desc) * (b2[sortBy.type] - b1[sortBy.type]))
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