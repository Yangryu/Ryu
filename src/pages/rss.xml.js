import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { getPosts, excerptOf } from "../lib/posts";

export async function GET(context) {
  const posts = await getPosts();
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return rss({
    title: `${SITE.title} · 全站动态`,
    description: SITE.description,
    site: context.site ?? "https://yangryu.github.io",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerptOf(post, 140),
      link: `${base}/posts/${post.id}/`,
      categories: [post.data.column, ...post.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
  });
}
