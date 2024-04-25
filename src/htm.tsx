/** @jsx jsx */

import { BlogSettings, jsx, presetWind, UnoGenerator } from "../deps.ts";

const Uno = new UnoGenerator({
  presets: [presetWind()],
});

export interface PageOptions {
  settings: BlogSettings;
  element: JSX.Element;

  title: string;
}

export async function page({ element, settings, title }: PageOptions) {
  const bodyHtml = element.toString();
  const { css } = await Uno.generate(bodyHtml);

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
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {/* <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js" /> */}
      </head>
      <body dangerouslySetInnerHTML={{ __html: bodyHtml }}>
      </body>
    </html>
  );
}
