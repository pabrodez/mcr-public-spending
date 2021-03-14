import { Heading, Link, VStack } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import styles from '../styles/About.module.scss'

export const About = () => {
    const extLink = (desc, url) => (<Link href={url} isExternal>{desc}<ExternalLinkIcon mx="2px" /></Link>)

    return (
        <VStack spacing="1.3rem" align="start" className={styles.About}>

            <Heading size="md">What's this?</Heading>
            <p>
                The aim of this website is to summarize the expendings of Manchester City Council since 2012.
            </p>
            <p>The files published by <abbr title="Manchester City Council">MCC</abbr> are collated, processed/cleaned
            and normalized to ease interpretation through the graphs.</p>
            <p>Selecting the year will show a brief summary of the transactions in that period. Any amounts paid to <abbr title="Greater Manchester Combined Authority">GMCA</abbr> have been excluded given
                the relatively large amounts, but it is also a governing public body. You can find <abbr title="Greater Manchester Combined Authority">GMCA</abbr>'s own
                spending reports {extLink('here', "https://www.greatermanchester-ca.gov.uk/who-we-are/accounts-transparency-and-governance/transparency-reports-finance/")}.
            </p>
            <p>The supplier rank only contains the top 55 suppliers by total amount received since 2012.
                We are planning to allow to explore all suppliers.</p>
                
            <Heading size="md">A bit of background</Heading>
            <p>
                Local authorities are required by the Government to publish details of any transactions exceeding £500, such as:
            </p>
            <ul>
                <li>individual invoices</li>
                <li>grant payments</li>
                <li>expense payments</li>
                <li>payments for good and services</li>
                <li>grants</li>
                <li>rent</li>
                <li>credit notes</li>
                <li>transactions with other public bodies</li>
            </ul>
            {extLink('More info', "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/408386/150227_PUBLICATION_Final_LGTC_2015.pdf")}


            <Heading size="md"><abbr title="Manchester City Council">MCC</abbr>'s specific case</Heading>
            <p><abbr title="Manchester City Council">MCC</abbr> publish the data monthly in <code>csv</code> format. Each row contains the headers:</p>
            <ul>
                <li><p><strong>Body name</strong> - details of who is publishing the data</p></li>
                <li><p><strong>Service area</strong> - the part of the Council that has made the transaction</p></li>
                <li><p><strong>Expenses type</strong> - a cost code related description of the type of goods or services purchased</p></li>
                <li><p><strong>Invoice payment date</strong> - date on which the transaction was paid</p></li>
                <li><p><strong>Transaction Number</strong> - a unique identifying number for each transaction</p></li>
                <li><p><strong>Amount</strong> - the net amount, excluding <abbr title="Value-Added Tax">VAT</abbr></p></li>
                <li><p><strong>Supplier name</strong> - name of the supplier who provided goods or services in relation to the transaction</p></li>
            </ul>
            <p>
                {extLink('More info', "https://secure.manchester.gov.uk/info/200110/budgets_and_spending/5022/publication_of_supplier_transactions_over_500")}
            </p>
            <p><strong>Sources</strong> are the {extLink('current year list', "https://www.manchester.gov.uk/open/downloads/66/what_we_spend_and_how_we_spend_it")} and the {extLink('archive', "https://www.manchester.gov.uk/open/downloads/74/expenditure_exceeding_500")}
            </p>

            <Heading size="md">Challenges to work on</Heading>
            <p>The main challenge is the slightly different naming of the same company across files and rows. For example, <code><small>k & l gates llp</small></code>/<code><small>k and l gates llp</small></code> or <code><small>building services technical sup ltd</small></code>/<code><small>building services technical support</small></code>
            . This can make aggregating data difficult.</p>

            <Heading size="md" className={styles.meme}>TODO</Heading>
            <ul>
                <li>Download processed JSON files</li>
                <li>Cross companies names with the {extLink("Companies House's API", "https://developer.company-information.service.gov.uk/")} so we can obtain
                a collated list of officers/members</li>
                <li>New ways to represent the information</li>
                <li>Improve normalization of data and data fetching</li>
            </ul>

            <Heading size="md">👩‍💻 Looking for suggestions/contributors</Heading>
            <p>You can find the repo {extLink('here', '')}</p>

        </VStack>

    )
}
