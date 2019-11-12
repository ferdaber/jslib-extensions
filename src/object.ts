import { extendMethod, extendStaticMethod } from "./util"

const P = Object.prototype
const hasOwn = Object.prototype.hasOwnProperty

export const strip = extendMethod(P, "$strip", (a: any, stripNulls) => {
  const b: any = {}
  for (const key of Object.getOwnPropertyNames(a)) {
    if (a[key] === undefined || (stripNulls && a[key] === null)) continue
    b[key] = a[key]
  }
  return b
})

export const is = extendMethod(
  P,
  "$is",
  Object.is !== undefined
    ? Object.is
    : // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Polyfill
      (a: any, b: any) => (a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b)
)

// https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.js
export const iss = extendMethod(P, "$iss", (a: any, b: any) => {
  if (is(a, b)) return true
  if (!isObject(a) || !isObject(b)) return false
  const aKeys = Object.keys(a),
    bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  for (let i = 0; i < aKeys.length; i++) {
    if (!hasOwn.call(b, aKeys[i]) || !is(a[aKeys[i]], b[aKeys[i]])) return false
  }
  return true
})

export const isObject = extendStaticMethod(
  Object,
  "$isObject",
  x => typeof x === "object" && x !== null
)

// https://github.com/lodash/lodash/blob/master/isPlainObject.js
export const isRecord = extendStaticMethod(Object, "$isRecord", x => {
  if (!isObject(x)) return false
  const directProto = Object.getPrototypeOf(x)
  if (directProto === null) return true
  let proto = directProto
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return directProto === proto
})
