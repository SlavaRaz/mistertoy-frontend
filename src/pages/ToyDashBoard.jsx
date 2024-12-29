import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadToys } from '../store/actions/toy.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'


import { InventoryChart } from '../cmps/InventoryChart.jsx'
import { PricesChart } from '../cmps/PriceChart.jsx'

export function ToyDashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [pricePerLabelData, setPricePerLabelData] = useState([])
    const [inventoryByLabelData, setInventoryByLabelData] = useState([])
    // const [dataSetForLineChart, setDataSetForLineChart] = useState([])

    console.log(pricePerLabelData)
    useEffect(() => {
        (async () => {
            try {
                if (!toys.length) {
                    await loadToys()
                }
            } catch (err) {
                showErrorMsg('Cannot load toys')
            }
        })()
    }, []) 

    useEffect(() => {
        const priceData = toyService.getPriceLabel(toys)
        setPricePerLabelData(priceData)
        const inventoryData=toyService.getInventoryLabel(toys)
        setInventoryByLabelData(inventoryData)
    }, [toys])


    if (!toys) return <div>Loading...</div>

    return (
        <section className="toy-dashboard">
            <h1>Toy Dashboard</h1>
            {/* <h2>Statistics for {toys.length} Toys</h2> */}
            <div className="charts-container">
                <div className="chart-wrapper">
                    <PricesChart data={pricePerLabelData} />
                </div>
                <div className="chart-wrapper">
                    <InventoryChart data={inventoryByLabelData} />
                </div>
                {/* <div className="chart-wrapper">
                    <LineComp data={dataSetForLineChart} />
                </div> */}
            </div>
        </section>
    )
}