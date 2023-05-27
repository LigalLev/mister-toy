import { Link } from "react-router-dom"
import {Labels} from '../cmps/labels'
import { toyService } from "../services/toy.service"

export function ToyPreview({ toy, onRemoveToy }) {
    return <article className="toy-preview">
        <div className="img-wrapper">
        <Link to={`/toy/${toy._id}`}> <img src={toyService.getImgUrl(toy.imgUrl)} alt="" /></Link>
        </div>
        <h4 className="toy-name">{toy.name}</h4>
        <h4>${toy.price}</h4>
        <h4>{toy.inStock ? 'In stock' : 'Not in stock'}</h4>
        <Labels labels={toy.labels}/>
        <Link to={`/toy/${toy._id}`}>Details</Link> |
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> |
        <button className="btn" onClick={() => { onRemoveToy(toy._id) }}>Delete item</button>


    </article>
}