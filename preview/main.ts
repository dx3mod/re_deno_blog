import { blog } from "../mod.ts";

blog({
  title: "me",
  description: "perfect blog",
  avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",

  links: [
    { title: "Email", url: "mailto:anono@email.com" },
    { title: "GitHub", url: "https://github.com" },
    { title: "Telegram", url: "https://t.me" },
    { title: "Other", url: "https://some-websize.com" },
  ],

  custom: {
    indexPage: {
      splitLine: false,
    },
  },
});
