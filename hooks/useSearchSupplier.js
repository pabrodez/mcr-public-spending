import { useEffect, useState } from 'react'
import { sanitize } from '../utils/sanitizeName'

export default function useSupplier(supplier) {
    
    const [resultSearch, setResultSearch] = useState(null)
    useEffect(() => {
        if (supplier !== '') {
            const name = sanitize(supplier)
            window.fetch(`/data/summaries/suppliers/${name}.json`)
                .then(res => res.json())
                .then(setResultSearch)
                .catch(e => console.log(e))
        }

    }, [supplier])

    return resultSearch
}