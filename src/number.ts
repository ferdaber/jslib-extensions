import { extendMethod, extendStaticMethod } from "./util"

const P = Number.prototype as number

export const isInside = extendMethod(P, "$isInside", (n, low, high) => n >= low && n <= high)
export const isBetween = extendMethod(P, "$isBetween", (n, low, high) => n > low && n < high)
export const approxEquals = extendMethod(P, "$approxEquals", (n, other, tolerance = 1e-6) =>
  n ? Math.abs((other - n) / n) < tolerance : false
)
export const clamp = extendMethod(P, "$clamp", (n, low, high) => Math.min(high, Math.max(low, n)))

export const randomInt = extendStaticMethod(Math, "$randomInt", (low, high) => {
  if (high === undefined) {
    high = low
    low = 0
  }
  return Math.round(Math.random() * (high - low)) + low
})
