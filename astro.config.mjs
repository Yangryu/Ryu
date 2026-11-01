import { defineConfig } from "astro/config";

// 仓库名是 Ryu，所以站点挂在 https://yangryu.github.io/Ryu/ 下面
export default defineConfig({
  site: "https://yangryu.github.io",
  base: "/Ryu",
  trailingSlash: "ignore",
});
