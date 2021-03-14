const sumAmounts = (a, b) => a + (b['amount'] || 0)

// we need a function that groups the totals by a key's values (think of it as a column)
const getTotalsByKey = (entries, key) => {
    const groupsMap = new Map()
    for (const entry of entries) {
        const keyVal = entry[key] ?? ''
        groupsMap.set(keyVal, entry['amount'] + (groupsMap.get(keyVal) ?? 0))
    }
    return [...groupsMap].sort((a, b) => b[1] - a[1])
        .map(group => ({ name: group[0], value: group[1] }))
}
// we'd use this to calculate the total amount in year X or supplier X
const getTotalByPropValue = (entries, prop, value) => (entries.filter(entry => entry[prop] === value)
    .reduce(sumAmounts, 0))

const diffPercent = (a, b) => ((b - a) / a)


const cleanEntry = (entry) => {
    const { bodyName, serviceArea, expensesType,
        paymentDate, transactionNumber, amount,
        supplier
    } = entry
    const entryDate = new Date(paymentDate)
    const year = entryDate.getFullYear()
    const month = entryDate.getMonth() + 1

    return {
        year,
        serviceArea: serviceArea?.toLowerCase().trim() ?? '',
        expensesType: expensesType?.toLowerCase().trim() ?? '',
        supplier: supplier?.toLowerCase().trim().replace('limited', 'ltd') ?? '',
        amount, month, paymentDate: paymentDate ?? null
    }
}

const unique = (entries, column) => [...new Set(entries.map(entry => entry[column])
    .filter(value => value !== undefined && value !== NaN && value !== null))];

module.exports = {
    cleanEntry, diffPercent, getTotalByPropValue, getTotalsByKey
}