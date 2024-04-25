/** @jsx jsx */

import { BlogSettings, jsx } from "../deps.ts";

export interface PageOptions {
  settings: BlogSettings;
  element: JSX.Element;

  title: string;
}

export function page({ element, settings, title }: PageOptions) {
  return (
    <html lang={settings.lang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js" />
      </head>
      <body>
        {element}
      </body>
    </html>
  );
}
