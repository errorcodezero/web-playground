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

    return c.text("");
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

    return c.text("");
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

	if (rsp != "")
		return c.json({
		  secret: rsp,
		  message: "Secret Found!"
		});
	return c.json({
	  message: "No secret here!"
	});
  },
);

app.get("/changes", (c) => {
  return c.text(String(playground.getChanges()));
});

app.get("/changes/outside", (c) => {
  return c.text(String(playground.getOutsideChanges()));
});

app.get("/changes/inside", (c) => {
  return c.json(String(playground.getInsideChanges()));
});

Deno.serve(app.fetch);
