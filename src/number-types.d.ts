declare interface Number {
  $isInside(low: number, high: number): boolean
  $isBetween(low: number, high: number): boolean
  $approxEquals(other: number, tolerance?: number): boolean
  $clamp(low: number, high: number): number
}

declare interface Math {
  $randomInt(low: number): number
  $randomInt(low: number, high: number): number
}
