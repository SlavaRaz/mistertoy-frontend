import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'

import { LabelSelector } from "./LabelSelect.jsx"

const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter }) {
    
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))


    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onLabelChange(selectedLabels) {    
        setFilterByToEdit(prevFilter => ({
          ...prevFilter,
          labels: selectedLabels,
        }))
      }
    

    const { txt, inStock, price } = filterByToEdit

    return (
        <section className="toy-filter">
            <h3>Toys Filter/Sort</h3>
            <form  >
                <input
                    onChange={handleChange}
                    value={txt}
                    type="text"
                    placeholder="Search"
                    name="txt"
                />

                <select name="inStock" value={inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not in stock</option>
                </select>

                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By price"
                    value={price || ''}
                    onChange={handleChange}
                />
                
                <LabelSelector labels={labels} onLabelChange={onLabelChange} />
            </form>
        </section>
    )

}
