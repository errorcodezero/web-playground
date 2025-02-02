import { Hono } from "hono";
import { logger } from "hono/logger";
import Playground from "./playground.ts";
import { validator } from "hono/validator";
import { getSchema } from "./validator.ts";
import { setSchema } from "./validator.ts";
import { setSecretSchema } from "./validator.ts";
import { searchSchema } from "./validator.ts";

const app = new Hono();
const playground = new Playground();

app.use(logger());

app.get("/", (c) => {
  return c.text(playground.toString());
});

app.post(
  "/get",
  validator("json", (value, c) => {
    const parsed = getSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed.error);
    }

    return parsed.data;
  }),
  (c) => {
    const data = c.req.valid("json");
    const rsp = playground.get(data.x, data.y);

    return c.json(rsp);
  },
);

app.post(
  "/set",
  validator("json", (value, c) => {
    const parsed = setSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed.error);
    }

    return parsed.data;
  }),
  (c) => {
    const data = c.req.valid("json");
    playground.set(data.x, data.y, data.input);
    const rsp = data.input;

    return c.json(rsp);
  },
);

app.post(
  "/setSecret",
  validator("json", (value, c) => {
    const parsed = setSecretSchema.safeParse(value);

    if (!parsed.success) {
      return c.json(parsed.error);
    }

    return parsed.data;
  }),
  (c) => {
    const data = c.req.valid("json");
    playground.setSecret(data.x, data.y, data.input);
    const rsp = data.input;

    return c.json(rsp);
  },
);

app.post(
  "/search",
  validator("json", (value, c) => {
    const parsed = searchSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed.error);
    }

    return parsed.data;
  }),
  (c) => {
    const data = c.req.valid("json");
    const rsp = playground.getSecret(data.x, data.y);

    return c.json(rsp);
  },
);

app.get("/changes", (c) => {
  return c.json(playground.getChanges());
});

app.get("/changes/outside", (c) => {
  return c.json(playground.getOutsideChanges());
});

app.get("/changes/inside", (c) => {
  return c.json(playground.getInsideChanges());
});

Deno.serve(app.fetch);
