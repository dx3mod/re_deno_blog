import { type BlogSettings, fs, Hono, middlewares } from "../deps.ts";

import { page } from "./htm.tsx";
import IndexPage from "./pages/Index.tsx";
import loadContents from "./contents_loader.ts";

interface BlogOptions {
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

    if (fs.existsSync("static/")) {
      app.use(middlewares.serveStatic({ root: "static/" }));
    } else if (this.options?.dev) {
      console.log("Not found 'static/' directory!");
    }

    if (this.settings.favicon) {
      app.get("/favicon.ico", this.staticFavicon());
    }

    const indexPage = page({
      element: IndexPage({
        settings: this.settings,
        posts: posts.sort(
          (a, b) =>
            (b.publishDate?.getTime() ?? 0) - (a.publishDate?.getTime() ?? 0),
        ),
      }),
      settings: this.settings,
      title: this.settings.title ?? "My blog",
    });

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

export async function blog(settings: BlogSettings) {
  const options: BlogOptions = {};

  if (Deno.args.includes("--dev")) {
    options.dev = true;
  }

  return Deno.serve({
    port: settings.port,
    hostname: settings.hostname,
  }, (await new Blog(settings, options).honoApp()).fetch);
}
