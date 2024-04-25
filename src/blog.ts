import { type BlogSettings, Hono, middlewares } from "../deps.ts";

import { existsSync } from "node:fs";

export interface BlogOptions {
  log?: boolean;
}

export class Blog {
  constructor(
    private readonly settings: BlogSettings,
    private readonly options?: BlogOptions,
  ) {}

  honoApp(): Hono {
    const app = new Hono();

    if (this.options?.log) {
      app.use(middlewares.logger());
    }

    if (existsSync("static/")) {
      app.use(middlewares.serveStatic({ root: "static/" }));
    } else if (this.options?.log) {
      console.log("Not found 'static/' directory!");
    }

    if (this.settings.favicon) {
      app.get("/favicon.ico", this.staticFavicon());
    }

    app.get("/", (c) => c.text("hello"));

    return app;
  }

  private staticFavicon() {
    switch (typeof this.settings.favicon) {
      case "string":
        return middlewares.serveStatic({ path: this.settings.favicon });
      default:
        throw new Error(
          "Not support  dark and light mode variants through 'prefers-color-scheme' now!",
        );
    }
  }
}

export function blog(settings: BlogSettings, options?: BlogOptions) {
  return Deno.serve({
    port: settings.port,
    hostname: settings.hostname,
  }, new Blog(settings, options).honoApp().fetch);
}
