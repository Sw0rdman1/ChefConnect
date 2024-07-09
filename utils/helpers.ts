export const calculateStatus = (error: string | undefined, touched: boolean | undefined, value: string) => {
    if (!value || !touched) return 'empty'
    if (touched && error) return 'error'
    return 'success'
}