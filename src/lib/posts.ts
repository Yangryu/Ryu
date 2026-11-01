import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/** 专栏定义：顺序就是首页卡片的顺序 */
export const COLUMNS = [
  { name: "生活随笔", desc: "日常的片段，偶尔的感想，还有慢慢想明白的事。" },
  { name: "学习记录", desc: "学过的知识、遇到的问题，以及一点点进步。" },
  { name: "作品集", desc: "做过的作品、试过的想法，和它们从零开始的过程。" },
  { name: "爱好", desc: "游戏、音乐、书影音，和那些愿意花时间的喜欢。" },
  { name: "小站日志", desc: "关于这个小站的搭建、更新，以及一路留下的变化。" },
];

/** 按日期倒序取所有已发布文章 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 首页摘要：没写 excerpt 就截正文前 90 字 */
export function excerptOf(post: Post, max = 90): string {
  if (post.data.excerpt) return post.data.excerpt;
  const text = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function formatDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function shortDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

/** 专栏名 → URL 段（中文直接进路径，浏览器会自动编码） */
export function columnSlug(name: string): string {
  return name;
}
