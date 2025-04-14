import { defineConfig } from "vitepress";
import { getPosts } from "./theme/serverUtils";

//每页的文章数量
const pageSize = 10;

export default defineConfig({
  title: "Random Needles",
  base: "/",
  cacheDir: "./node_modules/vitepress_cache",
  description: "Random thoughts from Duskzhen",
  ignoreDeadLinks: true,
  themeConfig: {
    posts: await getPosts(pageSize),
    website: "https://github.com/airene/vitepress-blog-pure", //copyright link
    // 评论的仓库地址
    comment: {
      repo: "zerob13/notes.anya2a.com",
      themes: "github-light",
      issueTerm: "pathname",
    },
    nav: [
      { text: "Home", link: "/" },
      //   { text: "Category", link: "/pages/category" },
      { text: "Archives", link: "/pages/archives" },
      //   { text: "Tags", link: "/pages/tags" },
      { text: "About", link: "/pages/about" },
    ],
    search: {
      provider: "local",
    },
    //outline:[2,3],
    outline: {
      label: "文章摘要",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/zerob13/notes.anya2a.com" },
    ],
  } as any,
  srcExclude: ["README.md"], // exclude the README.md , needn't to compiler

  vite: {
    //build: { minify: false }
    server: { port: 5000 },
  },
  /*
      optimizeDeps: {
          keepNames: true
      }
      */
});
