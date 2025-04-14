---
date: 2025-04-14
title: DeepChat 开发笔记：从0开始薅牦牛毛
categroy: 开发笔记
tags:
- DeepChat
- Architecture
- Electron
- DesktopApp
- OpenSource
description: DeepChat 最初的一些想法和设计的记录。以及为什么在市场上有那么多现存的产品后，还开始做这么一个“套壳”应用

---

# 2024 VueConf

故事要从 2024 年的 VueConf 开始说起。那时候和后来 DeepChat 的另一个开发者一起去了深圳的 VueConf，当时听了 [Anthony Fu](https://antfu.me/) 的分享 [Anthony 的开源之路：Yak Shaving「剪牛毛」](https://antfu.me/posts/about-yak-shaving-zh)，回来后后劲特别足，就很想找个事情开始折腾折腾。

在这之前，我对于大部分“造轮子”的心态就是现在有的又不是不能用，何必折腾呢。甚至对于很多事情总觉得有种堂吉诃德一般的对着风车挥舞攻击的无意义感。然后去年又遇到了一些生活和工作上的变动，突然就想明白了，为啥要在意这么多东西呢，写个代码而已，有趣就可以做啊。

# Cursor 到 Yak Shaving
去年后来的事情就是Cursor突然变的超级强，一下子节约了我大量的体力活编码的时间，于是我也有更多的精力去思考其它事情，甚至想做点别的。

一开始我去研究了 Cline，毕竟这是当时能找得到开源的最接近 Cursor 的一个项目了。也试图自己瞎折腾写了一些 调用API 的 Task Loop，做了一些小玩具和实验，但总觉得不过瘾。

当时我用的最多的 ChatBot 应用是 [OpenCat](https://opencat.app/zh-Hans/)，主要是可以很方便的分享给亲朋好友一起用，毕竟当时就我一个人有卡可以充 OpenAI 的 API。后来 DeepSeek 出来之后，好模型的 API 唾手可得，于是我也逐步迁移到了 [Cherry Studio](https://cherry-ai.com/) 上面去使用。我很喜欢 Cherry Studio ，开源，功能齐全，新特性支持速度极快。虽然时至今日我也在 X 上看到有对于 Cherry Studio 的复杂度讨论，但我个人还是觉得这是面向开发者最好用的一个工具，具备足够多的自由度，可以说是 ChatBot 的瑞士军刀。

那么，既然我自己都觉得 Cherry Studio 好用，为什么我又去做 DeepChat ，这不是互相矛盾了么。为啥不直接给 Cherry 提 PR 呢。

这个就又要说回 Yak Shaving ，其实我一开始真的就是想去给 Cherry 提 PR 的，毕竟机缘巧合的我也写了好几年的 Electron 程序想着多少能做点啥。当时也是闲着无事，就去研读了 Cherry ，ChatMCP,Open WebUI 这几个 ChatBot 的代码，越看越有意思，自己心里也有了一些构思和想法，但人么就是懒，最后既没有开始自己写也没动力去给这几个项目提PR。

刚好这时候遇到 [AstaXie](https://x.com/astaxie) 在做 [ThinkInAI 社区](https://thinkinai.xyz/)，他需要一个社区版本的桌面 ChatBot。目前的几家开源的，要么协议上可能不合适，要么形态上可能不是想要的。那感情好，这不机会来了，二话不说我就一头轧入进去，开始了薅牦牛毛的过程。

# Why Electron

<del>当然因为我熟悉Electron</del>

开个玩笑，实际上技术选型的时候，我们也激烈的讨论过，Electron，Tarui，Flutter Desktop,React Native，原生直接开发。其实 macOS 端的话，这几个方式多多少少我都写过一段时间，整体来说也各有各的问题。如果人力充沛精力无限，我肯定会选择纯原生去开发，因为体验和能力就会好非常多。但这不是能力有限也做不过来么，综合考虑第三方库最多相对项目稳定性和可靠性也比较高的 Electron 就是我的第一选择了。

其实作为 1Password 七八年的订阅用户，在他们切换 Electron 的时候我一直有在关注，当时很多[激烈讨论](https://www.reddit.com/r/1Password/comments/p2k261/electron_really/)，但最终 1Password 还是做的不错，这也是其中一个让我坚持继续用 Electron 的原因。

之后就是 Renderer 也就是 UI 的框架选型了。这里就又要说到 React 和 Vue 的选择，其实从我的角度看，用哪个都没啥问题，在 ChatBot 这个应用场景上我实在是找不出什么理由去用其中一个而不用另一个。对我个人而言，我更喜欢 Vue3 的设计理念和社区氛围。而且这个项目让我投入进去的起点毕竟也是 VueConf，那不就顺理成章了么。

方向清楚了，那么就开始选脚手架吧。[electron-vite
](https://electron-vite.org/) 这个脚手架最终脱颖而出，其实原因很简单：

- vue + vite 的体验很好
- 这个脚手架支持 Bytecode 加密，已经都配置好了，不用我再折腾 （万一以后商业化呢，企业用户还是很在意这个的）
- typescript 的配置也很合理，不用我二次折腾
- 对于 Electron 的老大难问题：各种类型资源打包处理，是否要放入asar等这些东西都有很好的解决方案，心智负担低
- 对于 sqlite3 、sharp 之类的native依赖支持的也不错

综上，最后就开始用这个架子开始干活了。


# 未完待续

之后还会打算继续写一点 DeepChat 开发过程中的一些故事和想法，目前还有准备写的：

  - Main 和 Renderer 的划分和结构
  - 代码中大量出现的 Presenter 是什么
  - 我们是如何去简化封装 IPC 调用的，为什么我们的 preload.js 那么薄
  - 第一个版本就做了的多路流并发是怎么考虑的
  - MCP的实现和思路
  - Cursor 在 DeepChat 开发中的应用

...


