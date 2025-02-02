import { z } from 'zod'
import Playground from "./playground.ts"
import { Tile } from "./tile.ts";

const setSchema = z.object({
  x: z.number().int().nonnegative().lt(Playground.length),
  y: z.number().int().nonnegative().lt(Playground.length),
  input: z.nativeEnum(Tile),
});

const getSchema = z.object({
  x: z.number().int().nonnegative().lt(Playground.length),
  y: z.number().int().nonnegative().lt(Playground.length),
});

const searchSchema = z.object({
  x: z.number().int().nonnegative().lt(Playground.length),
  y: z.number().int().nonnegative().lt(Playground.length),
});

const setSecretSchema = z.object({
  x: z.number().int().nonnegative().lt(Playground.length),
  y: z.number().int().nonnegative().lt(Playground.length),
  input: z.string().emoji(),
});

export { getSchema, setSchema, searchSchema, setSecretSchema }
