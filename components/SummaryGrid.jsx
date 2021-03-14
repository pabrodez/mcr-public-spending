import { Fragment } from 'react'
import { toMoney, toPercent } from '../utils/intlFormats'
import styles from '../styles/SummaryGrid.module.scss'

export function SummaryGrid({ dataset }) {
    
    return (
        <section className={styles.summaryGrid}>
            <header>
                <h3>On year {dataset.year} MCR council spent <strong>{toMoney({ number: dataset.yearTotal })}</strong></h3>
                {
                    dataset.year === new Date().getFullYear() - 1 ?
                        <small>That's a <strong>{toPercent({ number: dataset.lastYearDiff })}</strong> {Math.sign(dataset.lastYearDiff) < 0 ? "decrease" : "increase"} from the previous year</small> :
                        null
                }
            </header>
            <ul>
                <li>
                    <h4>The top 5 areas of service</h4>
                    <dl>
                        {dataset.serviceArea.map(area => <Fragment key={area.name}><dt>{area.name}</dt><dd>{toMoney({ number: area.value })}</dd></Fragment>)}
                    </dl>
                </li>
                <li>
                    <h4>The top 5 expenses types</h4>
                    <dl>
                        {dataset.expenseType.map(type => <Fragment key={type.name}><dt>{type.name}</dt><dd>{toMoney({ number: type.value })}</dd></Fragment>)}
                    </dl>
                </li>
                <li>
                    <h4>The most befenitted suppliers</h4>
                    <dl>
                        {dataset.supplier.map(type => <Fragment key={type.name}><dt>{type.name}</dt><dd>{toMoney({ number: type.value })}</dd></Fragment>)}
                    </dl>
                </li>
            </ul>
        </section>
    )

}