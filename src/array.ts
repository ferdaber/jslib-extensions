import { extendMethod, extendGetter, extendStaticMethod } from "./util"
const P = Array.prototype

export const first = extendGetter(P, "$first", a => a[0])
export const last = extendGetter(P, "$last", a => a[a.length - 1])
export const empty = extendGetter(P, "$empty", a => a.length === 0)

export const compact = extendMethod(P, "$compact", a => a.filter(Boolean))
export const strip = extendMethod(P, "$strip", a => a.filter(a => a != null && !Number.isNaN(a)))
export const unique = extendMethod(P, "$unique", a => Array.from(new Set(a)))
export const reverse = extendMethod(P, "$reverse", a => {
  const b: typeof a = []
  for (let i = a.length - 1; i >= 0; i--) b.push(a[i])
  return b
})

export const idx = extendMethod(P, "$idx", (a, n) => {
  if (!a.length || n === -Infinity) return 0
  else if (n === Infinity) return a.length
  while (n < 0) n = (n + a.length) % a.length
  return n
})
export const at = extendMethod(P, "$at", (a, n) => a[idx(a, n)])
export const splice = extendMethod(P, "$splice", (a, n, ...args) => {
  n = idx(a, n)
  if (!args.length) return a.slice(0, n)
  const [deleteCount, ...items] = args,
    b: typeof a = []
  for (let i = 0; i < a.length; i++) {
    if (i === n) {
      i += deleteCount == null || deleteCount < 0 ? 0 : deleteCount
      for (let j = 0; j < items.length; j++) b.push(items[j])
    }
    if (i < a.length) b.push(a[i])
  }
  if (n === a.length && items.length) for (let j = 0; j < items.length; j++) b.push(items[j])
  return b
})
export const insertAt = extendMethod(P, "$insertAt", (a, n, ...items) => splice(a, n, 0, ...items))
export const removeAt = extendMethod(P, "$removeAt", (a, n, deleteCount = 1) =>
  splice(a, n, deleteCount)
)
export const shift = extendMethod(P, "$shift", (a, numItems = 1) => removeAt(a, 0, numItems))
export const pop = extendMethod(P, "$pop", (a, numItems = 1) => removeAt(a, -numItems, numItems))
export const push = extendMethod(P, "$push", (a, ...items) => insertAt(a, Infinity, ...items))
export const unshift = extendMethod(P, "$unshift", (a, ...items) => insertAt(a, 0, ...items))
export const sort = extendMethod(P, "$sort", (a, sortFn) => a.slice().sort(sortFn))

export const range = extendStaticMethod(Array, "$range", (start, end) => {
  if (end === undefined) {
    end = start
    start = 0
  }
  const a: number[] = []
  for (let n = start; n < end; n++) a.push(n)
  return a
})
export const tuple = extendStaticMethod(Array, "$tuple", (...args) => args)
