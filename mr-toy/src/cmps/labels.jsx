import { useDispatch, useSelector } from 'react-redux'

export function Labels({ labels }) {
    const allLabels = useSelector((storeState) => storeState.toyModule.labels)

function findLabelColor (label){
  return  allLabels.find(l => l.name === label)
}
    return <div className="labels flex"> {labels.map(label =>
        <div className="label" style={{ backgroundColor: findLabelColor(label)?.color }}>{label}</div>)}</div>

}