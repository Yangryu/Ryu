// 站点信息 —— 想改站名、副标题、作者，改这里就行
export const SITE = {
  title: "Ryu 的小站",
  tagline: "把日子写成文字",
  description: "一个安放文字和日常的小角落。慢慢记录，也慢慢发现。",
  author: "Ryu",
  /** 首页顶部那两行大字 */
  hero: ["把平凡的日子，", "写成自己的故事。"],
};

// 因为部署在 /Ryu 子路径下，站内链接都要走这个函数
const BASE = import.meta.env.BASE_URL; // "/Ryu/"
export const url = (p = "/") =>
  (BASE.endsWith("/") ? BASE.slice(0, -1) : BASE) + (p.startsWith("/") ? p : `/${p}`);
