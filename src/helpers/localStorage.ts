export const getLocalStorage = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  } catch (error) {
    return null
  }
}

export const setLocalStorage = (key: string, value: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(key, value)
    }
    return null
  } catch (error) {
    return null
  }
}
