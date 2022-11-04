export type DropdownItem<T> = {
  value: T
  key: string
  label: string
  description?: string
}

export const dd = {
  getKey: (e: DropdownItem<any>): string => e.key,
  getValue: (e: DropdownItem<any>): string => e.label,
  getDescription: (e: DropdownItem<any>): string | undefined => e.description,
} as const
