import styles from '../../styles/SankeyChart.module.scss'
import {
    AreaChart, Area, XAxis,
    YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Sankey
} from 'recharts';
import { SankeyCustomNode } from './SankeyCustomNode'

export function SankeyChart({ dataset }) {
   
    return (
        <section className={styles.SankeyChart}>
            <ResponsiveContainer width="100%" height="100%" >
                <Sankey data={dataset}  
                    nodePadding={25}
                    // margin={{
                    //     right: 0, left: 1, top: 0, bottom: 0
                    // }}
                    link={{ stroke: '#bf616a' }}
                    node={<SankeyCustomNode threshold={4_000_000}/>}>

                </Sankey>

            </ResponsiveContainer>
        </section>
    )
}