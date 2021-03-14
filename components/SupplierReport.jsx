import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { toMoney, toDate } from '../utils/intlFormats'

import styles from '../styles/SupplierReport.module.scss'
import { VStack } from '@chakra-ui/layout';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';

export function SupplierReport({ dataset }) {

    const {
        supplier,
        totalAmount,
        nTransactions,
        expensesByArea,
        expensesByType,
        lastTransactions
    } = dataset

    return (
        <VStack className={styles.SupplierReport} align="left" spacing="2em">
            <h2>This supplier has been involved in {nTransactions} transactions for a total of <strong>{toMoney({ number: totalAmount })}</strong>,
                excluding <abbr title="Value-added tax">VAT</abbr></h2>
            <section className={styles.graph}>
                <h3>Top expenses areas</h3>
                <ResponsiveContainer width="90%" aspect={1.5}>
                    <RadarChart data={expensesByArea} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip isAnimationActive={false}
                            formatter={(value) => toMoney({ number: value })} />
                    </RadarChart>
                </ResponsiveContainer>

            </section>
            <section className={styles.graph}>
                <h3>Top types of expense</h3>
                <ResponsiveContainer width="90%" aspect={1.5}>
                    <RadarChart data={expensesByType} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip isAnimationActive={false}
                            formatter={(value) => toMoney({ number: value })} />
                    </RadarChart>
                </ResponsiveContainer>

            </section>
            <section>
                <h3>Last transactions with <abbr title="Manchester City Council">MCC</abbr></h3>
                <ul>
                    {lastTransactions.map((a, i) => (
                        <li key={i}>
                            <Stat>
                                <StatLabel>{toDate({ date: new Date(a.paymentDate) })}</StatLabel>
                                <StatNumber>{toMoney({ number: a.amount })}</StatNumber>
                                <StatHelpText><span>Area:</span> {a.serviceArea} | <span>Type:</span> {a.expensesType}</StatHelpText>
                            </Stat>
                        </li>
                    ))}
                </ul>
            </section>
        </VStack >

    )
}