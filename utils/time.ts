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