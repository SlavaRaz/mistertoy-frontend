import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { toyService } from '../services/toy.service.js'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        (async () => {
            try {
                await loadToys()
            } catch (err) {
                showErrorMsg('Cannot load toys')
            }
        })()
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove toy')

        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getEmptyToy()

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy, pageIdx: 0 })
    }

    function onSetSort(sortBy) {
        setFilterBy({ sortBy })
    }

    function setPageIdx(pageIdx) {
        setFilterBy({ pageIdx })
    }

    const { inStock, labels, txt } = filterBy
    return (
        <section className="toy-index">
            {user && (
                <button onClick={onAddToy}>Add Random toy ⛐</button>
            )}
            <ToyFilter
                filterBy={{ inStock, labels, txt }}
                onSetFilter={onSetFilter}
            />
            <ToySort
                sortBy={filterBy.sortBy}
                onSetSort={onSetSort}
            />
            <button>
                <Link to="/toy/edit">Add Toy</Link>
            </button>
            <PaginationButtons
                pageIdx={filterBy.pageIdx}
                setPageIdx={setPageIdx}
                toysLength={toys.length}
            />
            {isLoading
                ? <Loader />
                : <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />}
        </section>
    )

}