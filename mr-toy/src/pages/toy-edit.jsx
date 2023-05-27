
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from '../services/toy.service'
import { removeToy, saveToy } from '../store/toy.action'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
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
        console.log('toy to edit on save:',toyToEdit)
        toyToEdit.labels = toyToEdit.lables ? toyToEdit.labels : ["Kids"]
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

    console.log('toyToEdit when saving:', toyToEdit)
    return <section className="toy-edit">
        <img src={toyToEdit.imgUrl} alt="" />
        <div className="edit-content-container">
            <h2>{toyToEdit._id ? 'Edit toy' : 'Add a new toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name</label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <label htmlFor="imgUrl">Image Url</label>
                <input type="text"
                    name="imgUrl"
                    id="imgUrl"
                    placeholder="Enter Url..."
                    value={toyToEdit.imgUrl}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">inStock</label>
                <input className="input-inStock" type="checkbox"
                    name="inStock"
                    value={toyToEdit.inStock}
                    onChange={handleChangeInStock} checked={toyToEdit.inStock} />
                <div>
                    <button className="btn-save">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    {toyToEdit._id && <button className="btn-save" onClick={() => {
                        onRemoveToy(toyToEdit._id)
                    }}>Delete</button>}

                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </div>
    </section >
}
