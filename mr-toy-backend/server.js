const express = require('express')
const app = express()
const toyService = require('./services/toy-service')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


// App Configuration
// const corsOptions = {
//     origin: [
//         'http://127.0.0.1:8080',
//         'http://localhost:8080',
//         'http://127.0.0.1:3000',
//         'http://localhost:3000'
//     ],
//     credentials: true
// }
// app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body

/////////lable api
app.get('/api/label', (req, res) => {
    // TODO: get sortBy too
    labelService.query()
        .then(labels => {
            res.send(labels)
        })
        .catch(err => {
            console.log('Cannot load labels')
            res.status(400).send('Cannot load labels')
        })
})


//////toys api
// List
app.get('/api/toy', (req, res) => {
    const { name, maxPrice, pageIdx, labels, sortType,
        sortDesc } = req.query
    const filterBy = { name, labels, pageIdx, maxPrice: +maxPrice }
    const sortBy = { type: sortType, desc: sortDesc }
    toyService.query(filterBy, sortBy)
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            console.log('Cannot load toys')
            res.status(400).send('Cannot load toys')
        })
})

// Add
app.post('/api/toy', (req, res) => {
    const { name, price, inStock, labels } = req.body
    const toy = {
        name,
        price: +price,
        inStock,
        createdAt: Date.now(),
        labels,
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot add toy')
            res.status(400).send('Cannot add toy')
        })
})

// Edit
app.put('/api/toy', (req, res) => {
    const { _id, name, price, inStock, labels } = req.body
    const toy = {
        _id,
        name,
        price: +price,
        inStock,
        labels,
    }
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Cannot update toy')
            res.status(400).send('Cannot update toy')
        })

    // res.status(400).send('Cannot update toy')
})



app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => res.send(toy))
        .catch(err => res.status(403).send(err))
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(msg => {
            res.send({ msg, toyId })
        })
        .catch(err => {
            console.log('Cannot remove toy')
            res.status(400).send('Cannot remove toy')
        })
})



app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// app.listen(3030, () => console.log('Server ready at port 3030!'))

const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

