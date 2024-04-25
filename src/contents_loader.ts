import { extractFrontMatter, fs, path, Post, removeMarkdown } from "../deps.ts";

export default async function loadContents(rootDir: string) {
  const posts = [];

  for await (const dirEntry of fs.walk(rootDir, { exts: ["md"] })) {
    posts.push(loadPost(dirEntry.path));
  }

  return Promise.all(posts);
}

async function loadPost(pathname: string): Promise<Post> {
  const parsed = extractFrontMatter(await Deno.readTextFile(pathname));

  const publishDate = parsed.attrs?.publish_date
    ? new Date(parsed.attrs["publish_date"] as string)
    : new Date();

  const snippet = parsed.attrs?.snippet ??
    cropSnippet(parsed.body);

  return {
    pathname,
    title: parsed.attrs?.title as string ?? path.basename(pathname),
    markdown: parsed.body,
    publishDate,
    readTime: 0,
    snippet,
  };
}

function cropSnippet(markdown: string) {
  const maybeSnippet = markdown.split("\n\n")[0];
  return maybeSnippet ? removeMarkdown(maybeSnippet) : undefined;
}
