import { extendMethod, extendGetter } from "./util"
const AP = Array.prototype

export const first = extendGetter(AP, "$first", a => a[0])
export const last = extendGetter(AP, "$last", a => a[a.length - 1])
export const empty = extendGetter(AP, "$empty", a => a.length === 0)

export const compact = extendMethod(AP, "$compact", a => a.filter(Boolean))
export const strip = extendMethod(AP, "$strip", a => a.filter(a => a != null && !Number.isNaN(a)))
export const unique = extendMethod(AP, "$unique", a => Array.from(new Set(a)))
export const reverse = extendMethod(AP, "$reverse", a => {
  const b: typeof a = []
  for (let i = a.length - 1; i >= 0; i--) b.push(a[i])
  return b
})

export const idx = extendMethod(AP, "$idx", (a, n) => {
  if (!a.length || n === -Infinity) return 0
  else if (n === Infinity) return a.length
  while (n < 0) n = (n + a.length) % a.length
  return n
})
export const at = extendMethod(AP, "$at", (a, n) => a[idx(a, n)])
export const splice = extendMethod(AP, "$splice", (a, n, ...args) => {
  n = idx(a, n)
  if (!args.length) return a.slice(0, n)
  const [deleteCount, ...items] = args,
    b: typeof a = []
  for (let i = 0; i < a.length; i++) {
    if (i === n) {
      i += deleteCount ?? 0
      for (let j = 0; j < items.length; j++) b.push(items[j])
    }
    if (i < a.length) b.push(a[i])
  }
  if (n === a.length && items.length) for (let j = 0; j < items.length; j++) b.push(items[j])
  return b
})
export const insertAt = extendMethod(AP, "$insertAt", (a, n, ...items) => splice(a, n, 0, ...items))
export const removeAt = extendMethod(AP, "$removeAt", (a, n, deleteCount = 1) =>
  splice(a, n, deleteCount)
)
export const shift = extendMethod(AP, "$shift", (a, numItems = 1) => removeAt(a, 0, numItems))
export const pop = extendMethod(AP, "$pop", (a, numItems = 1) => removeAt(a, -numItems, numItems))
export const push = extendMethod(AP, "$push", (a, ...items) => insertAt(a, Infinity, ...items))
export const unshift = extendMethod(AP, "$unshift", (a, ...items) => insertAt(a, 0, ...items))
export const sort = extendMethod(AP, "$sort", (a, sortFn) => a.slice().sort(sortFn))

export const range = extendMethod(Array, "$range", (_, start, end) => {
  if (end === undefined) {
    end = start
    start = 0
  }
  const a: number[] = []
  for (let n = start; n < end; n++) a.push(n)
  return a
})
export const tuple = extendMethod(Array, "$tuple", (_, ...args) => args)
