---
# try also 'default' to start simple
theme: geist
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
---

# 《基于Nuxt与flutter的多端可拓展个人知识软件“云舒”的设计与实现》
<style>
h1 {
  position: absolute;
  font-size: 1.8em;
  text-align: center;
}
#ref{
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translate(350px, -50%);
}
</style>

<div id="ref">
  <span class="px-2 py-1 rounded text-xl">
    第二次阶段性汇报
  </span>
  <span class="px-2 py-1 rounded text-xl">
    万旭杰
  </span>

</div>

---

# 上周预计任务完成

- 前端基本页面构建完成（如文档，登录注册等）
- 数据库结构设计完成（目前完成了基本的设计）
- 引入“云舒”开源编辑器（根据(blocksuite)[https://blocksuite-toeverything.vercel.app/?init] fork）
- 完成移动端项目结构构建
---

前端基本页面构建完成（如文档，登录注册等）

<img src="windife/1.png"/>

---

<img src="windife/2.png"/>

nuxt的bug捉虫: 每个前端组件只能有一个根节点, 不然会出现路由切换组件不渲染的问题(白屏)

---

可拓展文档数据设计如下
```js
{//页面数据
    "time" : 1550476186479,//修改时间
    "blocks" : [{
         "id": "oUq2g_tl8y",
         "type": "header",
         "data": {
            "text": "Windife",
            "level": 2
         }
      },]//为提升可拓展性将文档中分块存储
}
```

---


`blocksuite`目前的功能过多且不好和当前项目组合, 需要再参考其他项目fork构建
目前打算参考`editor.js`, `notion`, `blocksuite`等做nuxt的模组改进封装

<img src="windife/3.jpg"/>

---

# 完成前端工程化单元测试准备工作

```js
import { describe, test } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('My test', async () => {
  await setup({
  })

  test('my test', () => {
    // ...
  })
})

```

---

# 创建了electron demo app
为桌面端应用作进一步的准备

```js
function createWindow() {
  // 创建窗口.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 950,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      nodeIntegration: true,
    },
  });

  // 加载app的index.html.
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000'); // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../../index.html'));
  }
}
```

---

# 完成移动端项目结构构建

参考项目:(https://github.com/kaina404/FlutterDouBan)完成构建
<img src="windife/4.png"/>

---

下周要做的工作

1. 完成前端状态管理与后端协同, 初步功能实现展示
2. 封装前端ui库并发布
3. 修改完善文档编辑器, 并进一步完善项目设计
4. 部署至服务器

