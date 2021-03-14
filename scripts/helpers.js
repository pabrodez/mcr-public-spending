const download = require('download')
const axios = require('axios').default
const transformCsvToJson = require('./transform-csv-to-json')
const fs = require('fs').promises

const CURRENT_URL = 'https://www.manchester.gov.uk/open/downloads/66/what_we_spend_and_how_we_spend_it'
const ARCHIVE_URL = 'https://www.manchester.gov.uk/open/downloads/74/expenditure_exceeding_500'
const ARCHIVE_REGEX = /http:\/\/www.manchester.gov.uk\/open\/downloads\/\d+\/expenditure_exceeding_500_\d{4}_\d{4}/gi
const MONTH_LINK_REGEX = /a href="http:\/\/www.manchester.gov.uk\/open\/downloads\/file\/(?<id>\d+)\/(?<endingStr>expenditure_exceeding_500_(?<month>[a-z]+)_(?<finYear>\d{4}))">.*?<\/a>.*?CSV/gi

const createMonthDownloadLink = (id, endingStr) => `http://www.manchester.gov.uk/open/download/downloads/id/${id}/${endingStr}.csv`

const downloadFile = (url, folder, filename) => {
    return download(url, folder, { filename })
        .then(async () => {
            console.log(`${url} downloaded`)
            const json = await transformCsvToJson(`${folder}/${filename}`)
            const jsonFileName = filename.replace('.csv', '.json')

            await fs.writeFile(`${folder}/${jsonFileName}`, JSON.stringify(json))
        })
        .catch((err) => {
            console.error(`${url} could not be downloaded`)
            console.error(err)
        })
}
async function getArchiveYearsLinks() {
    try {
        const resp = await axios.get(ARCHIVE_URL, { responseType: 'text' })
        const text = await resp.data
        const yearsLinks = text.match(ARCHIVE_REGEX)

        return yearsLinks
    } catch (error) {

    }
}

async function getMonthsMatches(yearUrl) {
    try {
        const resp = await axios.get(yearUrl, { responseType: 'text' })
        const text = await resp.data
        const matches = [...text.matchAll(MONTH_LINK_REGEX)]

        return matches
    } catch (error) {

    }
}

module.exports = {
    CURRENT_URL,
    downloadFile,
    getMonthsMatches,
    createMonthDownloadLink,
    getArchiveYearsLinks
}