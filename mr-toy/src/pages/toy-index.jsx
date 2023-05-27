import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { toyService } from '../services/toy.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { loadLabels, loadToys, removeToy, saveToy } from '../store/toy.action'

export function ToyIndex() {

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(toyService.getDefaultSortBy())
    const toysData = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const labels = useSelector((storeState) => storeState.toyModule.labels)

    useEffect(() => {
        console.log('loacing toys with:', sortBy)
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    useEffect(() => {
        loadLabels()
    }, [])

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

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    return <section>
        <main>
            <section className="operating-container full">
                <Link to={`/toy/edit`}>Add Toy</Link>
                <ToyFilter
                    onSetFilter={onSetFilter}
                    onSetSortBy={onSetSortBy} />
            </section>
            {isLoading && <h4>Loading...</h4>}
            <ToyList
                toys={toysData.toysToDisplay}
                onRemoveToy={onRemoveToy}
                onAddToy={onAddToy}
            />
        </main>
    </section>
}