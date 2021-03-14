const LOCALE = 'en-GB'
const DATE_UNITS = {
    week: 604_800,
    day: 86_400,
    hour: 3_600,
    minute: 60,
    second: 1
}

const getDiffInUnits = (diffInSeconds) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
        if (diffInSeconds >= secondsInUnit) {
            const value = Math.floor(diffInSeconds / secondsInUnit) * -1
            return { value, unit }
        }
    }
}

export const toPercent = ({ locale = LOCALE, number }) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(number)
export const toDigit = ({ locale = LOCALE, number }) => new Intl.NumberFormat(locale).format(number)
export const toMoney = ({ locale = LOCALE, number }) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'GBP', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(number / 1000) + 'K'
export const toDate = ({ locale = LOCALE, date }) => new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(date)
export const toRelativeTime = ({ locale = LOCALE, timestamp }) => {
    const rtf = new Intl.RelativeTimeFormat(locale)
    const diffSeconds = (new Date() - timestamp) / 1000
    const {value, unit} = getDiffInUnits(diffSeconds)   
    return rtf.format(value, unit)
}
