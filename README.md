# re_deno_blog

Re-implementation of [deno_blog][deno_blog] for minimal boilerplate blogging.

The project is currently in active development. :ramen:

[deno_blog]: https://github.com/denoland/deno_blog

## Get Started :rocket:

```ts
import { blog } from "https://esm.sh/gh/dx3mod/re_deno_blog/mod.ts";

blog({
  title: "me",
  description: "perfect blog",
  avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",
});
```

To run

```console
$ deno run --allow-net --allow-read=posts main.ts
```

## Preview

Clone the repository. Go to `preview` directory and run command:

```console
$ deno task dev
```
