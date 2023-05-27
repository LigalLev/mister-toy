import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service"
import { Labels } from '../cmps/labels'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1> {toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        <img src={toyService.getImgUrl(toy.imgUrl)} alt="" />
        <h4>{toy.inStock ? 'In stock' : 'Not in stock'}</h4>
        <Labels labels={toy.labels} />
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
        <Link to="/toy">Back to store</Link>
    </section>
}