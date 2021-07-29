export const getLocalStorage = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  } catch (error) {
    console.log(`${error}`)
  }
}
export const setLocalStorage = (key, value: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(key, value)
    }
    return null
  } catch (error) {
    console.log(`${error}`)
  }
}

