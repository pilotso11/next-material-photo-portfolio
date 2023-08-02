// Capitalize the first letter of captions
export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Extract the photo caption from the file name.  All text after the dash.
// Then replace the dashes with spaces
// For example photo12345-red-roof.jpg will become 'Red roof'
export function textAfterDash(str: string): string {
    const p = str.indexOf('-')
    if (p < 0)
        return str
    return str.substring(p + 1).replace(/-/g, ' ')
}

// Capitalize the first letter of each word in a string
export function textUtils(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase())
}