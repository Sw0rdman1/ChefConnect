export const generateTimeString = (date: Date) => {
    const now = new Date()
    const dateFormatted = new Date(date)
    const diff = now.getTime() - dateFormatted.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
        return `${days}d ago`
    } else if (hours > 0) {
        return `${hours}h ago`
    } else if (minutes > 0) {
        return `${minutes}m ago`
    } else {
        return `${seconds}s ago`
    }
}

export const isDayChanged = (date1: Date, date2: Date) => {
    const dateFormatted1 = new Date(date1)
    const dateFormatted2 = new Date(date2)
    return dateFormatted1.getDate() !== dateFormatted2.getDate()
}

export const generateDateText = (date: Date) => {
    const dateFormatted = new Date(date)
    const now = new Date()
    const diff = now.getTime() - dateFormatted.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
        return 'Today'
    }
}