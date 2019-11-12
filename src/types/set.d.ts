declare interface Set<T> {
  $empty: boolean

  $asArray(): T[]
  $add(...values: T[]): Set<T>
  $remove(...values: T[]): Set<T>
  $filter(filterFn: (value: T) => boolean): Set<T>
  $toggle(...values: T[]): Set<T>
}
