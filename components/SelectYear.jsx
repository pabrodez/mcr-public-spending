import styles from '../styles/SelectYear.module.scss'
import { Select } from "@chakra-ui/react"

export function SelectYear({ data, onChange }) {

    return (
        <section className={styles.SelectYear}>
            <label htmlFor="year-select">Select year</label>
            <Select id="year-select" onChange={(e) => onChange(e.target.value)} defaultValue={data[data.length - 1]} maxWidth="max-content">
                {data &&
                    data.map(year => <option key={year} value={year}>{year}</option>)
                }
            </Select>
        </section>
    )
}