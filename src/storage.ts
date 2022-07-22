import { isNil } from 'lodash'

type StorageKey = 'configuration' | 'samples' | 'colorMode' | 'editorInput'

export const Ttl = {
  seconds: (s: number): number => s * 1000,
  minutes: (m: number): number => m * Ttl.seconds(60),
  hours: (h: number): number => h * Ttl.minutes(60),
  days: (d: number): number => d * Ttl.hours(24),
}

type ValueWithTtl<T> = {
  value: T
  ttl?: number
}

export type Storage = {
  get<T>(key: StorageKey): T | undefined
  get<T>(key: StorageKey, defaultValue: T, verify?: (readValue: T) => boolean): T
  set<T>(key: StorageKey, value: T, ttl?: number): void
}

export const storage: Storage = {
  get<T>(key: StorageKey, defaultValue?: T, verify?: (readValue: T) => boolean): T | undefined {
    const rawValue = localStorage.getItem(key)
    if (isNil(rawValue)) {
      return defaultValue
    }
    try {
      const { value, ttl } = JSON.parse(rawValue) as ValueWithTtl<T>
      if ((isNil(ttl) || Date.now() < ttl) && (verify === undefined || verify?.(value))) {
        return value
      } else {
        localStorage.removeItem(key)
        return defaultValue
      }
    } catch (e) {
      console.error(e)
      return defaultValue
    }
  },
  set<T>(key: StorageKey, value: T, ttl?: number): void {
    const withTtl: ValueWithTtl<T> = {
      value,
      ttl: isNil(ttl) ? undefined : Date.now() + ttl,
    }
    return localStorage.setItem(key, JSON.stringify(withTtl))
  },
}
