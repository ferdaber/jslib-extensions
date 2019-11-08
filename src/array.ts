import { UnboundMethod, extendMethod, GetterMethod, extendGetter } from "./util"

type Method<K extends keyof any[]> = UnboundMethod<any[], K>
type Getter<K extends keyof any[]> = GetterMethod<any[], K>
const AP = Array.prototype

export const first = extendGetter(AP, "$first", a => a[0])
export const last = extendGetter(AP, "$last", a => a[a.length - 1])
export const empty = extendGetter(AP, "$empty", a => a.length === 0)

export const compact = extendMethod(AP, "$compact", a => a.filter(Boolean))
export const strip = extendMethod(AP, "$strip", a => a.filter(a => a != null))
export const unique = extendMethod(AP, "$unique", a => Array.from(new Set(a)))
export const reverse = extendMethod(AP, "$reverse", a => a.slice().reverse())

export const idx = extendMethod(AP, "$idx", (a, n) => a.length && (n + a.length) % a.length)
export const at = extendMethod(AP, "$at", (a, n) => a[a.$idx(n)])
