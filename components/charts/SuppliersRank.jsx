import {
    AreaChart, Area, XAxis,
    YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Bar, BarChart, LabelList
} from 'recharts';
import { toMoney } from '../../utils/intlFormats'
import styles from '../../styles/SuppliersRank.module.scss'

const renderLabel = (props) => {
    const {
        x, y, width, height, value,
    } = props;
    const offset = value < 180_000_000 ? width : 0
    return (
        <text x={x + width} y={y + height - 5} fill="#3b4252" textAnchor={`${offset ? 'start' : 'end'}`} fontWeight="600">
            {toMoney({ number: value })}
        </text>
    );
}

export function SuppliersRank({ dataset, handler }) {

    return (
        <section className={styles.SuppliersRank} >
            <header>
                <h3>Explore the most benefitted suppliers</h3>
            </header>
            <div>
                <ResponsiveContainer width="100%" aspect={1.0 / 3.5} >
                    <BarChart
                        data={dataset} layout="vertical"
                        barCategoryGap='2%'
                    >
                        <YAxis type="category" dataKey="name" hide />
                        <XAxis type="number" hide />
                        <Bar dataKey="value" fill="#d23948" onClick={handler} opacity={0.5} >
                            <LabelList dataKey="name" position="insideTopLeft" fill="#3b4252" fontWeight="500" />
                            <LabelList dataKey="value" fill="#3b4252"
                                formatter={(e) => toMoney({ number: e })}
                                content={renderLabel}
                            />
                        </Bar>
                        <Tooltip isAnimationActive={false} cursor={{ fill: 'transparent' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section >
    )
}