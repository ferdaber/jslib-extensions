import { extendMethod, extendGetter, extendStaticMethod } from "./util"

const P = String.prototype as string

export const empty = extendGetter(P, "$empty", a => a.trim().length === 0)

export const capitalize = extendMethod(
  P,
  "$capitalize",
  a => a && a[0].toLocaleUpperCase() + a.substr(1)
)
export const truncate = extendMethod(P, "$truncate", (a, max) =>
  a.length > max ? a.substr(0, max) : a
)
export const ellipsize = extendMethod(P, "$ellipsize", (a, max) =>
  a.length > max ? a.substr(0, max) + "…" : a
)

export const uuid = extendStaticMethod(String, "$uuid", () =>
  Math.random()
    .toString(36)
    .substr(2)
)
