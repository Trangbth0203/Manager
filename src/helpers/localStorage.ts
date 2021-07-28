export const getLocalStorage = (value: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(value)
    }
    return null
  } catch (error) {
    console.log(`${error}`)
  }
}
