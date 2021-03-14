const XLSX = require('xlsx')

module.exports = async function transformCsvToJson(csvFileName) {
    const workbook = XLSX.readFile(csvFileName, { raw: true })
    const firstSheetName = workbook.SheetNames[0]
    const firstSheet = workbook.Sheets[firstSheetName]

    const json = XLSX.utils.sheet_to_json(firstSheet)

    const formattedJson = json.map(element => {

        const amountColName = Object.keys(element).find(key => key.includes('Amount'))  // the amount column name was changed from Amount to Net Amount
         
        const {
            'Body Name': bodyName,
            'Service Area': serviceArea,
            'Expenses Type': expensesType,
            'Invoice Payment Date': paymentDateStr,
            'Transaction Number': transactionNumber,
            [amountColName]: amountStr,
            'Supplier Name': supplier
        } = element

        const paymentDate = paymentDateStr ? new Date(paymentDateStr.replace(/(\d+)\.(\d+)\.(\d+)/, '$3-$2-$1')).getTime() : paymentDateStr;
        const amount = amountStr ? Number(amountStr.replace(/[,£]/g, '')) : 0; // GBP symbol added recently

        return {
            bodyName,
            serviceArea,
            expensesType,
            paymentDate,
            transactionNumber,
            amount,
            supplier
        }
    })

    return formattedJson
}