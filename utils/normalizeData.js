// Read the transformed JSONs and reshape them into chart-ready data structures and summaries

const fs = require('fs')
const path = require('path')
const helpers = require('./transform-helpers')
// read, parse and return formatted JSON files
// this returns what is the input for all functions that produce chart-ready data
function readJsonData() {
    const dataPath = path.join('public', 'data', 'archive')
    const files = fs.readdirSync(dataPath)
        .filter(file => /json$/g.test(file))

    let entries = []
    const jsonPath = (name) => path.join(dataPath, name)

    for (const file of files) {
        const json = fs.readFileSync(jsonPath(file), { encoding: 'UTF-8' })
        const parsedArr = JSON.parse(json)
        parsedArr.forEach(entry => entries.push(helpers.cleanEntry(entry)))
    }

    return entries
}

// summaries of all years. First year was 2011, but we exclude it as it's incomplete
function yearsSummary(entries) {

    const currentYear = new Date().getFullYear()

    let summaries = []
    const lastYearsTotals = []
    for (let i = 2012; i <= currentYear; i++) {
        // to summarise we just get the top 5
        const yearSet = entries.filter(entry => entry['year'] === i)
        const yearTotal = helpers.getTotalByPropValue(entries, 'year', i)
        const serviceArea = helpers.getTotalsByKey(yearSet, 'serviceArea').slice(0, 5)
        const expenseType = helpers.getTotalsByKey(yearSet, 'expensesType').slice(0, 5)
        const supplier = helpers.getTotalsByKey(yearSet, 'supplier')
            .filter(a => a.name !== 'gmca').slice(0, 5)
        //  we compare the last year with the previous
        // exclude current year because it's incomplete
        if ([currentYear - 1, currentYear - 2].includes(i)) lastYearsTotals.push(yearTotal)

        summaries.push({ year: i, yearTotal, serviceArea, expenseType, supplier })
    }
    const lastYearDiff = helpers.diffPercent(...lastYearsTotals)
    summaries[summaries.length - 2].lastYearDiff = lastYearDiff

    return summaries
}

// chart-ready data for sankey chart
function sankeyData(entries) {
    // it was painful to do this (https://recharts.org/en-US/api/SankeyChart)
    const nodes = []
    const links = []

    entries.forEach(entry => {
        const { year, serviceArea, expensesType, supplier, amount, ...rest } = entry;
        // add new nodes if they're not in array
        [year, serviceArea].forEach(col => {
            const index = nodes.findIndex(a => a.name === col)
            index === -1 && nodes.push({ name: col })
        });
        // look for existing source and target nodes and update amount
        // DOESN'T work for a chart with more than two different sources
        [year, serviceArea].reduce((a, b) => {
            const ind1 = nodes.findIndex(z => z.name === a)
            const ind2 = nodes.findIndex(z => z.name === b)
            const linkInd = links.findIndex(z => z.source === ind1 && z.target === ind2)
            if (linkInd > -1) {
                links[linkInd] = { ...links[linkInd], value: links[linkInd].value + amount }

            } else {
                links.push({ source: ind1, target: ind2, value: amount })
            }

            return b
        })
    })

    return { nodes, links }
}

// for the supplier rank bar chart
function suplierRankData(entries) {
    const suppRank = helpers.getTotalsByKey(entries, 'supplier')
        .filter(a => a.name !== 'gmca').slice(0, 55)
    return suppRank
}

// summary info of a given supplier
function supplierSummary(entries, supplier) {
    const filtered = entries
        .filter(entry => entry.supplier === supplier)
    const totalAmount = filtered.reduce((a, b) => a + (b['amount'] || 0), 0)
    const nTransactions = filtered.length
    const lastTransactions = filtered.sort((a, b) => b.paymentDate - a.paymentDate).slice(0, 5)
    const expensesByArea = helpers.getTotalsByKey(filtered, 'serviceArea').slice(0, 5)
    const expensesByType = helpers.getTotalsByKey(filtered, 'expensesType').slice(0, 5)

    return {
        supplier,
        totalAmount,
        nTransactions,
        expensesByArea,
        expensesByType,
        lastTransactions
    }
}

// sanitize names
function sanitize(name, replacement) {
    const regex = /[\s\/\?<>\\:\*\|"]/g
    return name.replace(regex, replacement)
}
module.exports = {
    readJsonData, yearsSummary, sankeyData, suplierRankData, supplierSummary, sanitize
}