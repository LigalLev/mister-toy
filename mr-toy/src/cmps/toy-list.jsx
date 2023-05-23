import PropTypes from 'prop-types'

import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

  

    return <ul className="toy-list">
        {toys && toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={() => { onRemoveToy(toy._id) }}>Delete Item</button>
                    {/* <button onClick={() => { onEditToy(toy) }}>Edit</button> */}
                </div>

            </li>)}
    </ul>
}



// ToyList.propTypes = {
//     txt(props, propName, cmpName) {
//         if (typeof props.txt !== 'string') {
//             return new Error('Not a string!')
//         }
//     },
//     nums: PropTypes.arrayOf(PropTypes.number)
// }