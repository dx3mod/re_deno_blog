/** @jsx jsx */

import { BlogSettings, jsx, Post } from "../../deps.ts";
import SocialLink, { SocialLinkProps } from "../components/SocialLink.tsx";

export default function IndexPage(
  { settings, posts }: { settings: BlogSettings; posts: Post[] },
) {
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

          {settings.links && (
            <nav class="mt-3 flex gap-2">
              {settings.links.map((link) =>
                SocialLink(link as SocialLinkProps)
              )}
            </nav>
          )}
        </div>
      </header>

      <div class="max-w-screen-sm px-6 mx-auto">
        <div class="pt-16 lt-sm:pt-12 border-t-1 border-gray-300/80">
          {posts.map((post) => <PostCard post={post} />)}
        </div>

        {/* {state.footer || <Footer author={state.author} />} */}
      </div>
    </div>
  );
}

function PostCard(
  { post }: { post: Post },
) {
  return (
    <div class="pt-12 first:pt-0">
      <h3 class="text-2xl font-bold">
        <a class="" href={post.pathname}>
          {post.title}
        </a>
      </h3>
      {/* <Tags tags={post.tags} /> */}
      <p class="text-gray-500/80">
        {post.author && <span>{post.author} {" "}</span>}
        {}
      </p>
      <p class="mt-3 text-gray-600 dark:text-gray-400">{post.snippet}</p>
      <p class="mt-3">
        <a
          class="leading-tight text-gray-900 dark:text-gray-100 inline-block border-b-1 border-gray-600 hover:text-gray-500 hover:border-gray-500 transition-colors"
          href={post.pathname}
          title={`Read "${post.title}"`}
        >
          Read More
        </a>
      </p>
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
