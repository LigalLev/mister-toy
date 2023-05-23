import { useDispatch, useSelector } from 'react-redux'


import { toyService } from '../services/toy.service'

import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadToys, removeToy, saveToy } from '../store/toy.action'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function ToyIndex() {

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const dispatch = useDispatch()
    const toysData = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    // function onEditToy(car) {
    //     const price = +prompt('New price?', car.price)
    //     if (!price || price === car.price) return

    //     const carToSave = { ...car, price }
    //     saveCar(carToSave)
    //         .then((savedCar) => {
    //             showSuccessMsg(`Car updated to price: $${savedCar.price}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update car')
    //         })
    // }

   

    function onSetFilter(filterBy) {
        console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }

    return <section>
        <h3>Toys App</h3>
        <main>
        <Link to={`/toy/edit`}>Add Toy</Link>
            {/* <button onClick={onAddToy}>Add random toy</button> */}
            <ToyFilter onSetFilter={onSetFilter} />
            {isLoading && <h4>Loading...</h4>}
            <ToyList
                toys={toysData.toysToDisplay}
                onRemoveToy={onRemoveToy}
                onAddToy={onAddToy}
            />
            <hr />
            {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
        </main>
    </section>
}