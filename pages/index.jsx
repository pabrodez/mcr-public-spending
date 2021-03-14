import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {
  SankeyChart, SuppliersRank, SummaryGrid, SelectYear,
  ModalTemplate, About, SupplierReport
} from '../components'
import { Button, Link } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import useSupplier from '../hooks/useSearchSupplier'
import { toDate, toRelativeTime } from '../utils/intlFormats'

export default function Home({ yearsRange, datasets, info }) {

  // supplier modal
  const [isSupplierOpen, setSupplierModal] = useState(false)
  // supplier state
  const [supplierSearch, setSupplierSearch] = useState('')
  const supplierReportFound = useSupplier(supplierSearch)
  const supplierHandler = (data, _) => {
    setSupplierSearch(data.payload.name)
    setSupplierModal(true)
  }
  // year state
  const [selectedYear, setYear] = useState(yearsRange[yearsRange.length - 1])
  const yearReport = useMemo(() => datasets.yearsSummaries.find(a => a.year === Number(selectedYear)),
    [selectedYear]);
  const yearsSankey = useMemo(() => datasets.yearsSankeys.find(a => a.nodes[0].name === Number(selectedYear)),
    [selectedYear])
  // help modal
  const [isAboutOpen, setAboutModal] = useState(false)


  return (
    <div className={styles.container}>
      <Head>
        <title>MCR Council transactions</title>
      </Head>

      <header>
        <h1>Manchester City Council's transactions</h1>
        <h2>Who benefits the most?</h2>
      </header>

      <main className={styles.main}>
        <SelectYear data={yearsRange} onChange={setYear} />
        <SummaryGrid dataset={yearReport} />
        <SankeyChart dataset={yearsSankey} />
        <SuppliersRank dataset={datasets.supplierRank} handler={supplierHandler} />
        <Button position="fixed" bottom="5rem" right="2rem" fontSize="2em" borderRadius="50%"
          size="lg" onClick={() => setAboutModal(true)}>?</Button>
      </main>
      {
        (isSupplierOpen && supplierReportFound !== null) ?
          <ModalTemplate isOpen={isSupplierOpen} onClose={() => setSupplierModal(false)} title={supplierReportFound.supplier ?? 'Personal info redacted/Not specified'}>
            <SupplierReport dataset={supplierReportFound} />
          </ModalTemplate>
          : null
      }
      {
        isAboutOpen ?
          <ModalTemplate isOpen={isAboutOpen} onClose={() => setAboutModal(false)} title={"About"}>
            <About />
          </ModalTemplate>
          : null
      }

      <footer className={styles.footer}>
        <Link href="https://github.com/pabrodez" isExternal>By @pabrodez with <span>❤️</span></Link>
        <span>Data last updated <time dateTime={toDate({ date: info.lastUpdated })} title={toDate({ date: info.lastUpdated })}>{toRelativeTime({ timestamp: info.lastUpdated })}</time></span>
      </footer>
    </div >
  )
}


export async function getStaticProps() {
  // use webpack's require.context do dynamically load json files
  // https://webpack.js.org/api/module-methods/#requirecontext
  const yearsSummaries = (ctx => {
    return ctx.keys().map(key => ctx(key))
  })(require.context('../public/data/summaries/years', false, /[0-9]{4}.json$/))
  const yearsSankeys = (ctx => {
    return ctx.keys().map(key => ctx(key))
  })(require.context('../public/data/summaries/years', false, /[0-9]{4}-sankey.json$/))

  const supplierRank = require('../public/data/summaries/suppliers-rank.json')
  const yearsRange = Array.from({ length: (new Date().getFullYear() - 1 - 2012) + 1 }).map((_, i) => i + 2012)
  const datasets = { yearsSummaries, yearsSankeys, supplierRank, }
  const info = require('../public/data/info')
  return {
    props: {
      info,
      yearsRange,
      datasets
    }
  }
}