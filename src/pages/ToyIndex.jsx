import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
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
            {/* <PaginationButtons
                pageIdx={filterBy.pageIdx}
                setPageIdx={setPageIdx}
                toysLength={toys.length}
            /> */}
            {isLoading
                ? <Loader />
                : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
        </section>
    )

}