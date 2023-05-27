import { useSelector } from 'react-redux'

import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { MultipleSelectChip } from "./multi-select"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export function ToyFilter({ onSetFilter, onSetSortBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(toyService.getDefaultSortBy())
    const labels = useSelector((storeState) => storeState.toyModule.labels)
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        onSetSortBy(sortBy)
        // eslint-disable-next-line
    }, [filterByToEdit, sortBy])

    function handleChangeSortBy({ target }) {
        console.log('value:', target.value)
        setSortBy((prevSortBy) => ({ ...prevSortBy, type: target.value }))
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onChange({ target }) {
        console.log('on change instock target:', target)
        const field = target.name
        const value = target.value
        const newFilterBy = { ...filterByToEdit }
        switch (field) {
            case 'name':
            case 'inStock':
            case 'labels':
                newFilterBy[field] = value
                break
            case 'maxPrice':
                newFilterBy[field] = +value
                break
        }
        setFilterByToEdit(newFilterBy)
    }

    return <section className="toy-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                id="name"
                name="name"
                placeholder="Search toy by name"
                value={filterByToEdit.name}
                onChange={onChange}
                ref={elInputRef}
                className="search-input-container"
            />
            <label htmlFor="maxPrice">Max price:</label>
            <input type="range"
                min="1"
                max="150"
                id="maxPrice"
                name="maxPrice"
                // title="range"
                value={filterByToEdit.maxPrice}
                onChange={onChange}
            />
            {/* <label htmlFor="inStock">In stock:</label >
            <select id="inStock" name="inStock" onChange={onChange}>
                <option value={null}>All</option>
                <option value={true}>In stock</option>
                <option value={false}>Not in stock</option>
            </select> */}
        </form>
        <FormControl sx={{ m: 1, width: 150, margin: 2, }}>
            <InputLabel id="select-label">Stock</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                value={filterByToEdit.inStock}
                label="label"
                name="inStock"
                onChange={onChange}
            >
                <MenuItem value={null}>All</MenuItem>
                <MenuItem value={true}>In stock</MenuItem>
                <MenuItem value={false}>Not in stock</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 150, margin: 2, }}>
            <InputLabel id="select-label">Sort By</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                value={sortBy.type}
                label="label"
                onChange={handleChangeSortBy}
            >
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'price'}>Price</MenuItem>
                <MenuItem value={'createdAt'}>Created at</MenuItem>
            </Select>
        </FormControl>

        <MultipleSelectChip labels={labels} onSelectLabels={onChange} />

    </section>
}


