# What is this?

This is a personal library used to extend the standard JS library with more prototype methods and getters. This is not intended to be used for serious projects as prototype method extensions of built-ins are normally frowned upon since they can collide with each other. To at least minimize collisions, all extension methods are prefixed with `$`.

## Install

```sh
npm install @ferdaber/jslib-extensions
```

## Usage

This library only supports ES Modules.

```js
import "@ferdaber/jslib-extensions"
// Now new prototype methods will be available for arrays, objects, numbers, strings and sets.
```

## Development

This project uses Yarn as its package manager.

### Setup

```sh
yarn install
```

### Testing

```sh
yarn test
```

## Reference

### `Array`

```ts
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
  $splice(startIdx: number, deleteCount?: number): T[]
  $splice(startIdx: number, deleteCount: number, ...items: T[]): T[]
  $insertAt(idx: number, ...items: T[]): T[]
  $removeAt(idx: number, numItems?: number): T[]
  $shift(numItems?: number): T[]
  $pop(numItems?: number): T[]
  $push(...items: T[]): T[]
  $unshift(...items: T[]): T[]
  $sort(sortFn?: (a: T, b: T) => number): T[]
}

declare interface ArrayConstructor {
  $range(length: number): number[]
  $range(start: number, end: number): number[]
  $tuple<T extends any[]>(...args: T): T
}
```

### Number

```ts
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
```

### Object

```ts
declare interface Object {
  $strip<T>(this: T, stripNulls?: boolean): T
  $is<T>(other: unknown): other is T
  $iss<T>(other: unknown): other is T
}

declare interface ObjectConstructor {
  $isObject(x: unknown): x is object
  $isRecord(x: unknown): x is object
}
```

### Set

```ts
declare interface Set<T> {
  $empty: boolean

  $asArray(): T[]
  $add(...values: T[]): Set<T>
  $remove(...values: T[]): Set<T>
  $filter(filterFn: (value: T) => boolean): Set<T>
  $toggle(...values: T[]): Set<T>
}
```

### String

```ts
declare interface String {
  $empty: boolean

  $capitalize(): string
  $truncate(maxLength: number): string
  $ellipsize(maxLength: number): string
}

declare interface StringConstructor {
  $uuid(): string
}
```
