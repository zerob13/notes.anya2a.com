import { defineConfig } from "vitepress";
import { getPosts } from "./theme/serverUtils";
import { withMermaid } from "vitepress-plugin-mermaid";


//每页的文章数量
const pageSize = 10;

export default withMermaid({
  title: "Random Needles",
  base: "/",
  cacheDir: "./node_modules/vitepress_cache",
  description: "Random thoughts from Duskzhen",
  ignoreDeadLinks: true,
  themeConfig: {
    posts: await getPosts(pageSize),
    website: "http://notes.anya2a.com/", //copyright link
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
      { icon: "github", link: "https://github.com/zerob13" },
      { icon: "x", link: "https://x.com/imwritingbugs" },
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
  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-6E1G0Y3LWN",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-6E1G0Y3LWN');`,
    ],
  ],
});
