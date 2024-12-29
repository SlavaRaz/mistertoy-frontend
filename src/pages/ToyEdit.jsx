import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Cannot edit toy', err)
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCarToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toyToEdit)
            showSuccessMsg('Toy Saved!')
            navigate('/toy')
        } catch (err) {
            // console.log('Cannot save toy', err)
            showErrorMsg('Cannot save toy')
        }
    }

    const { name, price, labels: toyLabels } = toyToEdit
    // const labels = toyService.getToyLabels()

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    onChange={handleChange}
                    value={name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    onChange={handleChange}
                    value={price}
                    type="number"
                    name="price"
                    id="price"
                    min={1}
                    placeholder="Enter price"
                    required
                />
                {/* <label>Labels:</label>
                <div className="labels-container">
                    {labels.map(label => (
                        <div key={label}>
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                checked={toyLabels.includes(label)}
                                onChange={handleLabelChange}
                            />
                            <label htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div> */}

                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </form>
        </section>

    )
}