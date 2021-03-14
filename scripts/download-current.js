const helpers = require('./helpers')
const fs = require('fs')


    ; (async () => {

        let lastDate = ''

        try {
            const monthMatches = await helpers.getMonthsMatches(helpers.CURRENT_URL)
            await Promise.all(
                monthMatches.map((match, ind) => {
                    const { id, endingStr, month, finYear } = match.groups
                    const url = helpers.createMonthDownloadLink(id, endingStr)
                    if (ind === monthMatches.length - 1) lastDate = `${month}-${finYear}`

                    return helpers.downloadFile(url, './public/data/archive', `${month}-${finYear}.csv`)
                })
            )

            await fs.promises.copyFile(`./public/data/archive/${lastDate}.csv`, 'public/data/latest.csv')
            await fs.promises.copyFile(`./public/data/archive/${lastDate}.json`, 'public/data/latest.json')
            await fs.promises.writeFile('./public/data/info.json', JSON.stringify({ lastDate, lastUpdated: +new Date() }))

        } catch (error) {
            console.error(error)
        }

    })()