import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    return <article>
        <h4>{toy.name}</h4>
        <h4>{toy.price}</h4>
        <h4>{toy.inStock.toString()}</h4>
        <hr />
        <Link to={`/toy/${toy._id}`}>Details</Link> | 
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> 

    </article>
}