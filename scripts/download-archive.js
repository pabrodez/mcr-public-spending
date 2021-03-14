const utils = require('./utils')

;(async () => {
    try {
        const yearsLinks = await utils.getArchiveYearsLinks()
        const monthsMatches = await Promise.all(yearsLinks.flatMap((yearLink) => utils.getMonthsMatches(yearLink)))
        
        await monthsMatches.flat().reduce((promise, monthMatch) => {
            const { id, endingStr, month, finYear } = monthMatch.groups
            const url = utils.createMonthDownloadLink(id, endingStr)
            return promise.then(() => utils.downloadFile(url, './public/data/archive', `${month}-${finYear}.csv`))
        }, Promise.resolve())

    } catch (error) {

    }
})()