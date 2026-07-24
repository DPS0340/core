import { expect, test } from "bun:test"
import { TestPoint } from "lib/components/normal-components/TestPoint"
import { createErrorPlaceholderComponent } from "lib/components/primitive-components/ErrorPlaceholder"

test("allows a primitive component schema without a name field", () => {
  expect(() =>
    createErrorPlaceholderComponent({}, new Error("test")),
  ).not.toThrow()
})

test("allows a refined component schema with a name field", () => {
  expect(
    () => new TestPoint({ name: "TP1", footprintVariant: "pad" }),
  ).not.toThrow()
})
