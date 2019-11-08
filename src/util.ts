export type UnboundMethod<T, K extends keyof T> = T[K] extends (...args: infer A) => infer R
  ? (thisArg: T, ...args: A) => R
  : never
export type GetterMethod<T, K extends keyof T> = (thisArg: T) => T[K]

function createFnProperty(
  type: "getter" | "method",
  fn: (...args: any[]) => any
): PropertyDescriptor {
  return {
    configurable: true,
    enumerable: false,
    [type === "getter" ? "get" : "value"]() {
      return fn.call(this, this, ...arguments)
    },
  }
}

export function extendMethod<T, K extends keyof T>(obj: T, propKey: K, value: UnboundMethod<T, K>) {
  Object.defineProperty(obj, propKey, createFnProperty("method", value))
  return value
}

export function extendGetter<T, K extends keyof T>(obj: T, propKey: K, value: GetterMethod<T, K>) {
  Object.defineProperty(obj, propKey, createFnProperty("getter", value))
  return value
}
