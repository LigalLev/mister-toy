
import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return <ul className="toy-list clean-list">
        {toys && toys.map(toy =>
            <li key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
            </li>)}
    </ul>
}

