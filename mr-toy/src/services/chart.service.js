export const chartService = {
    getToyCountByLabel,
    getAvgPricePerLabel
}

function getToyCountByLabel(toys = []) {
    const toyCountByLabel = toys.reduce((acc, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (!acc[label]) acc[label] = {
                    count: 0,
                    inStock: 0,
                }
                if (toy.inStock) acc[label].inStock++
                acc[label].count++
            })
        }
        return acc
    }, {})

    const percentageValues = []
    for (const label in toyCountByLabel) {
        toyCountByLabel[label].percentage = toyCountByLabel[label].inStock / toyCountByLabel[label].count * 100
        percentageValues.push(toyCountByLabel[label].percentage)
    }
    const res = {
        labels: Object.keys(toyCountByLabel),
        values: percentageValues
    }
    return res
}

function getAvgPricePerLabel(toys = []) {
    const totalPricesByLabel = toys.reduce((acc, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (acc[label]) acc[label].price += toy.price
                if (!acc[label]) acc[label] = {
                    count: 0,
                    price: toy.price,
                }
                acc[label].count++
            })
        }
        return acc
    }, {})

    const avgPricePerLabel = []
    for (const label in totalPricesByLabel) {
        avgPricePerLabel.push(totalPricesByLabel[label].price / totalPricesByLabel[label].count).toFixed(0)
    }
    const res = {
        labels: Object.keys(totalPricesByLabel),
        values: avgPricePerLabel
    }
    return res
}