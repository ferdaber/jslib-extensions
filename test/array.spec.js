/// <reference path="../src/types/array.d.ts" />

import "../src/array"

describe("Array.prototype", () => {
  const ary1 = ["a", "b", "c"]

  it("$first", () => {
    expect(ary1.$first).toBe("a")
  })

  it("$last", () => {
    expect(ary1.$last).toBe("c")
  })

  it("$empty", () => {
    expect(ary1.$empty).toBe(false)
    expect([].$empty).toBe(true)
    expect(Array(5).$empty).toBe(false)
    expect([undefined, undefined, undefined].$empty).toBe(false)
  })

  it("$compact", () => {
    expect([undefined, null, 0, "", NaN, false].$compact()).toHaveLength(0)
    expect([undefined, null, 0, 1, "a", "", NaN, false].$compact()).toEqual([1, "a"])
    expect([undefined, null, 0, "", NaN, false].$compact().$empty).toBe(true)
  })

  it("$strip", () => {
    expect([undefined, null, 0, "", NaN, false].$strip().$empty).toBe(false)
    expect([undefined, null, 0, 1, "a", "", NaN, false].$strip()).toEqual([0, 1, "a", "", false])
    expect([undefined, null, NaN].$strip().$empty).toBe(true)
  })

  it("$unique", () => {
    expect([{}, {}, {}].$unique()).toEqual([{}, {}, {}])
    expect(["foo", "bar", "foo", "baz", "foo"].$unique()).toEqual(["foo", "bar", "baz"])
  })

  it("$reverse", () => {
    expect(ary1.$reverse()).toEqual(ary1.slice().reverse())
    expect([].$reverse()).toEqual([])
  })

  it("$idx", () => {
    expect(ary1.$idx(1)).toBe(1)
    expect(ary1.$idx(-1)).toBe(2)
    expect(ary1.$idx(-3)).toBe(0)
    expect(ary1.$idx(-4)).toBe(2)
  })

  it("$at", () => {
    expect(ary1.$at(1)).toBe("b")
    expect(ary1.$at(-1)).toBe("c")
    expect(ary1.$at(-3)).toBe("a")
    expect(ary1.$at(-4)).toBe("c")
  })

  it("$splice", () => {
    expect(ary1.$splice(1)).toEqual(["a"])
    expect(ary1.$splice(2)).toEqual(["a", "b"])
    expect(ary1.$splice(1, 1)).toEqual(["a", "c"])
    expect(ary1.$splice(1, null, "d", "e")).toEqual(["a", "d", "e", "b", "c"])
    expect(ary1.$splice(1, 1, "d", "e")).toEqual(["a", "d", "e", "c"])
    expect(ary1.$splice(1, 50, "d", "e")).toEqual(["a", "d", "e"])
    expect(ary1.$splice(-1, 0, "d", "e")).toEqual(["a", "b", "d", "e", "c"])
    expect(ary1.$splice(-1, 1, "d", "e")).toEqual(["a", "b", "d", "e"])
  })

  it("$insertAt", () => {
    expect(ary1.$insertAt(1, "d", "e")).toEqual(["a", "d", "e", "b", "c"])
    expect(ary1.$insertAt(-1, "d", "e")).toEqual(["a", "b", "d", "e", "c"])
  })

  it("$removeAt", () => {
    expect(ary1.$removeAt(1)).toEqual(["a", "c"])
    expect(ary1.$removeAt(1, 5)).toEqual(["a"])
    expect(ary1.$removeAt(0, Infinity)).toEqual([])
    expect(ary1.$removeAt(-1, Infinity)).toEqual(["a", "b"])
    expect(ary1.$removeAt(-2, Infinity)).toEqual(["a"])
  })

  it("$shift", () => {
    expect(ary1.$shift(Infinity)).toEqual([])
    expect(ary1.$shift(2)).toEqual(["c"])
    expect(ary1.$shift(1)).toEqual(["b", "c"])
    expect(ary1.$shift()).toEqual(["b", "c"])
  })

  it("$pop", () => {
    expect(ary1.$pop(Infinity)).toEqual([])
    expect(ary1.$pop(2)).toEqual(["a"])
    expect(ary1.$pop(1)).toEqual(["a", "b"])
    expect(ary1.$pop()).toEqual(["a", "b"])
  })

  it("$push", () => {
    expect(ary1.$push("d", "e")).toEqual([...ary1, "d", "e"])
    expect(ary1.$push(["d", "e"])).toEqual([...ary1, ["d", "e"]])
  })

  it("$unshift", () => {
    expect(ary1.$unshift("d", "e")).toEqual(["d", "e", ...ary1])
    expect(ary1.$unshift(["d", "e"])).toEqual([["d", "e"], ...ary1])
  })

  it("$sort", () => {
    expect(ary1.$sort()).not.toBe(ary1)
    expect(ary1.$sort()).toEqual(ary1)
  })
})

describe("ArrayConstructor", () => {
  it("$range", () => {
    expect(Array.$range(3)).toEqual([0, 1, 2])
    expect(Array.$range(3, 6)).toEqual([3, 4, 5])
  })

  it("$tuple", () => {
    expect(Array.$tuple("a", "b", "c")).toEqual(["a", "b", "c"])
  })
})
