import type en from './en'

export type Language = 'en' | 'pl'
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : T extends object
      ? { [Key in keyof T]: Widen<T[Key]> }
      : T

export type Dictionary = Widen<typeof en>
