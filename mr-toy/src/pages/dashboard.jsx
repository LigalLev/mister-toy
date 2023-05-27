import { useDispatch, useSelector } from 'react-redux'

import { chartService } from '../services/chart.service'

import { loadLabels, loadToys } from '../store/toy.action'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyDoughnut } from '../cmps/my-doughnut'
import { InventoryChart } from '../cmps/inventory-chart'
import { LineChart } from '../cmps/line-chart'

export function Dashboard() {
    const dispatch = useDispatch()
    const toysData = useSelector((storeState) => storeState.toyModule.toys)
    const labels = useSelector((storeState) => storeState.toyModule.labels)

    useEffect(() => {
        loadToys()
    }, [])

    useEffect(() => {
        loadLabels()
    }, [])
    let priceData = []
    priceData = chartService.getAvgPricePerLabel(toysData.toysToDisplay).values
    console.log('chartService:', priceData)
    // }
    return <section className="dashboard">
        <div className="chart"> Average price by label</div>
        {<MyDoughnut priceData={priceData} />}
        <div className="chart">Inventory by label</div>
        <InventoryChart toys={toysData.toysToDisplay} />
        <div className="chart">Purchases by date</div>
        <LineChart />
    </section>
}

