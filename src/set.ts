import { extendGetter, extendMethod } from "./util"

const P = Set.prototype

export const empty = extendGetter(P, "$empty", a => a.size === 0)

export const asArray = extendMethod(P, "$asArray", a => Array.from(a))
export const add = extendMethod(P, "$add", (a, ...values) => {
  const b = new Set(a)
  values.forEach(v => b.add(v))
  return b
})
export const remove = extendMethod(P, "$remove", (a, ...values) => {
  const b = new Set(a)
  values.forEach(v => b.delete(v))
  return b
})
export const filter = extendMethod(P, "$filter", (a, fn) => {
  const b: typeof a = new Set()
  a.forEach(value => fn(value) && b.add(value))
  return b
})
export const toggle = extendMethod(P, "$toggle", (a, ...values) => {
  const b = new Set(a)
  values.forEach(v => (b.has(v) ? b.delete(v) : b.add(v)))
  return b
})
