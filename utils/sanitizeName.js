// sanitize names
export function sanitize(name) {
    const regex = /[\s\/\?<>\\:\*\|"]/g
    return name.replace(regex, '_')
}

export const deSanitize = (name) => name.replace(/_/g, ' ')