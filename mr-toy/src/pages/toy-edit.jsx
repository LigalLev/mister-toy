
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from '../services/toy.service'
import { removeToy, saveToy } from '../store/toy.action'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'


export function ToyEdit() {
    const [toyEditInput, setToyEditInput] = useState('')
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyAddInput, setAddToyInput] = useState('')
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function onEditToy() {
        toyToEdit.txt = toyEditInput
        saveToy(toyToEdit)
            .then((savedToy) => {
                showSuccessMsg(` Updated toy: ${savedToy.txt}`)
                navigate(`/toy`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
                navigate(`/toy`)

            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))

    }
    function handleChangeInStock() {
        setToyToEdit((prevToy) =>
            ({ ...prevToy, inStock: !prevToy.inStock }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function onAddToy(ev) {
        ev.preventDefault()
        const toyToSave = toyService.getEmptyToy()
        toyToSave.txt = toyAddInput
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
        setAddToyInput('')
    }

    function onHandleChange({ target }) {
        setAddToyInput(target.value)
    }



    console.log('toyToEdit:', toyToEdit)
    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />
            <label htmlFor="inStock">In stock </label>
            <input type="checkbox"
                name="inStock"
                id="inStock" checked={toyToEdit.inStock} onChange={handleChangeInStock}
            />
            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
        <button onClick={() => {
            onRemoveToy(toyToEdit._id)
        }}>x</button>
    </section>
}
