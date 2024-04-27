/** @jsx jsx */
import { jsx } from "../../deps.ts";
import {
  IconEmail,
  IconExternalLink,
  IconGithub,
  IconTelegram,
} from "./icons.tsx";

export interface SocialLinkProps {
  /** The link title */
  title: string;
  /** The link */
  url: string;
  /** The element to use as the icon of the link */
  icon?: JSX.Element;
  /** The link target */
  target?: "_self" | "_blank" | "_parent" | "_top";
}

const IconDomainPatterns: [string, () => JSX.Element][] = [
  ["github.com", IconGithub],
  ["t.me", IconTelegram],
];

export default function SocialLink(
  { url, target, icon, title }: SocialLinkProps,
) {
  return (
    <a
      class="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-600/10 dark:bg-gray-400/10 text-gray-700 dark:text-gray-400 hover:bg-gray-600/15 dark:hover:bg-gray-400/15 hover:text-black dark:hover:text-white transition-colors group"
      href={url}
      rel={target === "_blank" ? "noopener noreferrer" : ""}
      target={target ?? "_self"}
    >
      {icon ?? matchUrlToIcon(url)()}
      <Tooltip>{title}</Tooltip>
    </a>
  );
}

function matchUrlToIcon(url: string): () => JSX.Element {
  if (url.startsWith("http")) {
    for (const [pattern, icon] of IconDomainPatterns) {
      if (
        url.startsWith(`https://${pattern}`) ||
        url.startsWith(`http://${pattern}`)
      ) {
        return icon;
      }
    }
  } else if (url.startsWith("mailto")) {
    return IconEmail;
  }

  return IconExternalLink;
}

function Tooltip({ children }: { children: string }) {
  return (
    <div
      class={"absolute top-10 px-3 h-8 !leading-8 bg-black/80 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"}
    >
      <span
        class="block absolute text-black/80"
        // style={{ top: -4, left: "50%", marginLeft: -4.5, width: 9, height: 4 }}
        style="top: -4px; left: 50%; margin-left: -4.5px; width: 9px; height: 4px;"
      >
        <svg
          class="absolute"
          width="9"
          height="4"
          viewBox="0 0 9 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.83564 0.590546C4.21452 0.253758 4.78548 0.253758 5.16436 0.590546L9 4H0L3.83564 0.590546Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {children}
    </div>
  );
}
