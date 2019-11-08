declare interface Array<T> {
  $first: T
  $last: T
  $empty: boolean

  $compact(): Exclude<T, null | undefined | false | "" | 0>[]
  $strip(): NonNullable<T>[]
  $unique(): T[]
  $reverse(): T[]

  $idx(n: number): number
  $at(n: number): T
  $insertAt(idx: number): T[]
  $removeAt(idx: number): T[]
  $shift(numItems?: number): T[]
  $pop(numItems?: number): T[]
  $push(...items: T[]): T[]
  $unshift(...items: T[]): T[]
  $splice(startIdx: number, deleteCount?: number): T[]
  $splice(startIdx: number, deleteCount: number, ...items: T[]): T[]
  $sort(sortFn?: (a: T, b: T) => number): T[]
}

declare interface ArrayConstructor {
  $range(length: number): number[]
  $range(start: number, end: number): number[]
  $tuple<T extends any[]>(...args: T): T
}
