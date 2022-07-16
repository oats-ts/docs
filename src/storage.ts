type StorageKey = 'configuration' | 'source'

export const storage = {
  get(key: StorageKey): string {
    return localStorage.getItem(key) ?? ''
  },
  set(key: StorageKey, value: string): void {
    return localStorage.setItem(key, value)
  },
}
