import { blog } from "../mod.ts";

blog({
  title: "me",
  description: "perfect blog",
  avatar: "https://deno-avatar.deno.dev/avatar/blog.svg",

  links: [
    { title: "Email", url: "mailto:dx3mod@bk.ru" },
    { title: "GitHub", url: "https://github.com/dx3mod" },
    { title: "Telegram", url: "https://t.me/dx3mod" },
  ],

  custom: {
    indexPage: {
      splitLine: false,
    },
  },
});
