import { expect, test } from "bun:test"
import { formatInvalidPropsError } from "lib/errors/InvalidProps"
import { z } from "zod"

test("formatInvalidPropsError preserves the legacy nested error shape", () => {
  const schema = z.object({
    nested: z.object({ count: z.number() }),
    tags: z.array(z.string().min(3)),
  })
  const result = schema.safeParse({
    nested: { count: "not-a-number" },
    tags: ["x"],
  })

  expect(result.success).toBe(false)
  if (result.success) return

  expect(formatInvalidPropsError(result.error)).toEqual({
    _errors: [],
    nested: {
      _errors: [],
      count: { _errors: ["Invalid input: expected number, received string"] },
    },
    tags: {
      _errors: [],
      0: {
        _errors: ["Too small: expected string to have >=3 characters"],
      },
    },
  })
})

test("formatInvalidPropsError preserves the legacy Required message", () => {
  const result = z
    .object({ value: z.union([z.string(), z.number()]) })
    .safeParse({})

  expect(result.success).toBe(false)
  if (result.success) return

  expect(formatInvalidPropsError(result.error)).toEqual({
    _errors: [],
    value: { _errors: ["Required", "Required"] },
  })
})
