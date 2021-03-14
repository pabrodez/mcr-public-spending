// normalizes the different data summaries and writes them into different files
const fs = require('fs').promises
const normalizeData = require('../utils/normalizeData')
const info = require('../public/data/info.json')

const summaryPath = './public/data/summaries'
const endYear = Number(info.lastDate.slice(-4))
const startYear = 2012

    ; (async () => {
        const entries = normalizeData.readJsonData()

        try {
            // years summaries    
            const yearsSumm = normalizeData.yearsSummary(entries)
            for (const year of yearsSumm) {
                await fs.writeFile(`${summaryPath}/years/${year.year}.json`, JSON.stringify(year))
            }
            // suppliers summaries
            const uniqueSuppliers = [...new Set(entries.map(a => a.supplier))]
            for (const supplier of uniqueSuppliers) {
                const supplierSumm = normalizeData.supplierSummary(entries, supplier)
                const sanitzedName = normalizeData.sanitize(supplierSumm.supplier, '_')
                await fs.writeFile(`${summaryPath}/suppliers/${sanitzedName}.json`,
                    JSON.stringify(supplierSumm))
            }
            // data for suppliers rank
            const supplierRank = normalizeData.suplierRankData(entries)
            await fs.writeFile(`${summaryPath}/suppliers-rank.json`, JSON.stringify(supplierRank))
            
            // sankey dataset for each year
            const yearsRange = Array.from({ length: (endYear - startYear) + 1 }).map((_, i) => i + startYear)
            await Promise.all(
                yearsRange.map(year => {
                    const yearEntries = entries.filter(a => a.year === year)
                    const yearData = normalizeData.sankeyData(yearEntries)
                    return fs.writeFile(`${summaryPath}/years/${year}-sankey.json`, JSON.stringify(yearData))
                })
            )


        } catch (error) {
            console.log('Error writting file:')
            console.log(error)
        }

    })()
