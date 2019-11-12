declare interface String {
  $empty: boolean

  $capitalize(): string
  $truncate(maxLength: number): string
  $ellipsize(maxLength: number): string
}

declare interface StringConstructor {
  $uuid(): string
}
