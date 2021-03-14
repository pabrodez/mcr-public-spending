# Manchester City Council's transactions
The aim of this website is to summarize the expendings of Manchester City Council since 2012. The files published by <abbr title="Manchester City Council">MCC</abbr> are collated, processed/cleaned and normalized to ease interpretation through the graphs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Background
Local authorities are required by the Government to publish details of any transactions exceeding £500, such as:
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
            
## Manchester City Council's specific case

MCC publish the data monthly in csv format. Each row contains the headers:
            <ul>
                <li>Body name - details of who is publishing the data</li>
                <li>Service area - the part of the Council that has made the transaction</li>
                <li>Expenses type - a cost code related description of the type of goods or services purchased</li>
                <li>Invoice payment date> - date on which the transaction was paid</li>
                <li>Transaction Number> - a unique identifying number for each transaction</li>
                <li>Amount - the net amount, excluding VAT</li>
                <li>Supplier name - name of the supplier who provided goods or services in relation to the transaction</li>
            </ul>

## TODO
<ul>
                <li>Download processed JSON files</li>
                <li>Cross companies names with the Companies House's API so we can obtain a collated list of officers/members</li>
                <li>New ways to represent the information</li>
                <li>Improve normalization of data and data fetching</li>
</ul>

## Tools

* Next.js
* Recharts
* Chakra UI
* GitHub Actions