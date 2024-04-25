import { type BlogSettings, Hono, middlewares, Post } from "../deps.ts";

import { existsSync } from "node:fs";
import { page } from "./htm.tsx";
import IndexPage from "./pages/Index.tsx";
import loadContents from "./contents_loader.ts";

export interface BlogOptions {
  dev?: boolean;
}

export class Blog {
  constructor(
    private readonly settings: BlogSettings,
    private readonly options?: BlogOptions,
  ) {}

  async honoApp(): Promise<Hono> {
    const app = new Hono();

    const posts = await loadContents("posts");

    app.use("*", middlewares.etag({ weak: true }));

    if (this.options?.dev) {
      app.use(middlewares.logger());
    }

    if (existsSync("static/")) {
      app.use(middlewares.serveStatic({ root: "static/" }));
    } else if (this.options?.dev) {
      console.log("Not found 'static/' directory!");
    }

    if (this.settings.favicon) {
      app.get("/favicon.ico", this.staticFavicon());
    }

    const indexPage = page({
      element: IndexPage({ settings: this.settings, posts }),
      settings: this.settings,
      title: this.settings.title ?? "My blog",
    }).toString();

    app.get("/", (c) => c.html(indexPage));

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

export async function blog(settings: BlogSettings, options?: BlogOptions) {
  return Deno.serve({
    port: settings.port,
    hostname: settings.hostname,
  }, (await new Blog(settings, options).honoApp()).fetch);
}
