/** @jsx jsx */
import { BlogSettings, jsx } from "../../deps.ts";

export default function IndexPage({ settings }: { settings: BlogSettings }) {
  return (
    <div class="home">
      <header class="w-full h-90 lt-sm:h-80 bg-cover bg-center bg-no-repeat">
        <div class="max-w-screen-sm h-full px-6 mx-auto flex flex-col items-center justify-center">
          {settings.avatar && <Avatar settings={settings} />}

          <h1 class="mt-3 text-4xl text-gray-900 dark:text-gray-100 font-bold">
            {settings.title ?? "My Blog"}
          </h1>

          <p class="text-lg text-gray-600 dark:text-gray-400">
            {settings.description}
          </p>

          <nav class="mt-3 flex gap-2"></nav>
        </div>
      </header>
    </div>
  );
}

function Avatar({ settings }: { settings: BlogSettings }) {
  return (
    <a
      href="/"
      class={[
        "bg-cover bg-center bg-no-repeat w-25 h-25 border-4 border-white",
        settings.avatarClass ?? "rounded-full",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundImage: `url(${settings.avatar})` }}
    />
  );
}
