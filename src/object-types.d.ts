declare interface Object {
  $strip<T>(this: T, stripNulls?: boolean): T
  $is<T>(this: T, other: unknown): other is T
  $iss<T>(this: T, other: unknown): other is T
}

declare interface ObjectConstructor {
  $isObject(x: unknown): x is object
  $isRecord(x: unknown): x is object
}
