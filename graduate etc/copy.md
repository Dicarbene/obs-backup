
# 摘  要

近年来，随着人们生活水平的提高，个人的数据数量也在不断增加，如何合理管理自己的数据成为了一个问题。本文旨在通过基于Next.js和Electron的数据人生管理系统的开发，实现对个人数据的高效管理。目前同类应用难以全面满足用户有关保存用户隐私数据的各类需求。数据人生管理系统就是旨在研究便捷保存个人隐私数据，并安全地在用户的各类终端上浏览并编辑个人数据的应用。 针对这些问题，采用 Next.js 、 Electron.js 、React Native 等技术，设计并实现了数据人生管理系统。前端页面采用基于 React 的Next.js框架，搭配 TailwindCSS 构建，配合Electron与 React Native有效解决了客户端多端访问问题和页面性能问题。后端采用 Next.js配合轻量级后端express ORM ·sqlite3·进行开发，极大地提高了开发效率。项目开放了用户自建数据库服务并对接了webdav 服务，在方便用户管理个人隐私数据同时，也有效避免了数据传递繁琐复杂的问题。

首先，本文介绍了Next.js和Electron的基本技术特点。然后，介绍了如何使用Next.js和Electron搭建数据人生管理系统。最后，通过实例演示了该系统的功能。

本文的研究表明，通过基于Next.js和Electron的数据人生管理系统的开发，可以解决个人数据管理问题。本系统不仅提高了数据管理的效率，而且还提供了更好的用户体验。

综上所述，本文为基于Next.js和Electron的数据人生管理系统的研究与开发提供了一种有效的方法。该系统不仅具有良好的实用性，而且对于提高个人数据管理水平具有重要意义。

这篇文章关注了基于Next.js和Electron的数据生命周期管理系统的开发，以解决随着人们生活水平的提高管理个人数据的日益严重的问题。该系统设计为高效地存储个人隐私数据，并在多种终端安全地查看和编辑。使用Next.js、Electron.js和React Native技术设计和实现该系统。前端页面使用Next.js框架、TailwindCSS构建，使用Electron和React Native解决多端客户端访问和页面性能问题。后端使用Next.js与轻量级Express ORM和sqlite3，大大提高了开发效率。该项目开放了用户创建的数据库服务，并集成了webdav服务，解决了数据传输问题。本文通过一个例子说明了该系统的功能。研究表明，使用Next.js和Electron开发数据生命周期管理系统可以有效地解决个人数据管理问题，提高效率，提供更好的用户体验。


**关键词：        个人数据；React；Next.js；Electron；React Native；**


数据生命管理系统、Next.js、Electron、React Native、前端页面、TailwindCSS、后端、Express ORM、sqlite3、用户创建数据库服务、webdav 服务、数据传输、个人数据管理问题、效率、用户体验。
# Abstract

In the era of data explosion, personal data is growing rapidly, and the need to store personal data securely and privately is also growing, but at present, such applications cannot fully meet the various needs of users regarding the preservation of their private data. Data Life Management System is an application that studies how to save personal data easily and securely browse and edit personal data on various terminals of users. To address these issues, we designed and implemented the Data Life Management System using Next.js, Electron.js, and React Native technologies. The front-end pages are built with React-based Next.js framework and TailwindCSS, and Electron and React Native effectively solve the problems of client-side multi-terminal access and page performance. The backend is developed using Next.js with lightweight backend tRPC, which greatly improves the development efficiency. The project is open to user-built database services and docked to the WebDAV service, which is convenient for users to manage their private data and also effectively avoid the problem of complicated data transfer.


This article focuses on the development of a data life management system based on Next.js and Electron, to address the increasing problem of managing personal data as people's living standards improve. The system is designed to efficiently store personal privacy data, and safely view and edit it on various terminals. Next.js, Electron.js, and React Native technologies were used to design and implement the system. The front-end pages were built with the Next.js framework, with TailwindCSS, and with Electron and React Native to address the issue of multi-end client access and page performance. The back-end uses Next.js with the lightweight Express ORM and sqlite3, greatly improving development efficiency. The project opens up user-created database services and integrates with WebDAV services, solving the problem of data transfer. This article demonstrates the system's functionality through an example. The research shows that using Next.js and Electron to develop a data life management system can effectively solve personal data management problems, improving efficiency and providing better user experience.

**Key words: Personal Data；React；Next.js；Electron；React Native；**

# 第1章 文献综述

## 1.1 研究目的及意义



近年来，随着人们生活水平的提高，个人的数据数量也在不断增加，如何合理管理自己的数据成为了一个问题。本文旨在通过基于Next.js和Electron的数据人生管理系统的开发，实现对个人数据的高效管理。目前同类应用难以全面满足用户有关保存用户隐私数据的各类需求。 针对这些问题，采用 Next.js 、 Electron.js 、React Native 等技术，设计并实现了数据人生管理系统。数据人生管理系统是一个旨在安全地存储和管理个人数据的应用程序。它允许用户在多个设备上轻松浏览和编辑他们的个人数据。数据人生管理系统使用户能够安全地存储、管理和分享数据，并为用户提供对其数据和谁可以访问数据的控制。数据人生管理系统还提供诸如数据加密和数据访问控制等功能。数据人生管理系统可以用作存储如联系信息、个人日记、私房食谱、日常待办打卡、日常记账、跑步记录、读书/观影笔记、医疗记录，以及更多不同的个人数据的安全私人数据库，还可以使用画板/语音输入各类用户的自定义输入。

前端页面采用基于 React 的Next.js框架，搭配 TailwindCSS 构建，配合Electron与 React Native有效解决了客户端多端访问问题和页面性能问题。后端采用 Next.js配合轻量级后端express ORM ·sqlite3·进行开发，极大地提高了开发效率。项目开放了用户自建数据库服务并支持webdav 协议，在方便用户管理个人隐私数据同时，也使用户方便的在多端传输数据。

| 功能/Features              | 数据人生管理系统 |
| -------------------------- |:----------------:|
| 开源/非商业闭源            |        ✅        |
| 数据安全性                 |        ✅        |
| 数据隐私性                 |        ✅        |
| 支持插件拓展               |        ✅        |
| 支持数据库导出、迁移       |        ✅        |
| 支持多端编辑、浏览个人数据 |        ✅        |
| 支持markdown拓展           |        ✅        |
| 支持用户fork自构建版本     |        ✅        |
| 支持在线协作               |        ❌        |

1.2 论文组织结构

1.4 论文组织结构 

本文主要对数据人生管理系统开发过程中的各个阶段进行论述，主要划分为如下7个章节。 
第一章 绪论。本章数据人生管理系统在国内外的研究数据人生管理系统的背景以及研究意义进行了阐述。 
第二章 相关技术研究。对系统采用的技术栈进行研究，并通过相关技术的对比分析以及技术的实现原理对技术进行了具体的介绍。
第三章 系统需求分析。结合物业管理工作过程中的各项需求，将系统划分为不同的功能模块，对各个功能模块进行详细的需求分析。同时对系统的响应高效性、安全性等非功能性需求进行分析。 
第四章 系统设计。对系统进行架构设计和安全设计，同时按照系统功能模块的划分对各个功能模块进行详细的设计。对系统的数据库进行设计，主要包括以 E-R 图的形式对数据库进行概念结构设计以及数据库主要表设计。
第五章 系统实现。本章详细描述了系统各个功能模块的实现过程，并对主要功能的实现进行了页面展示。同时还实现了系统前端性能的优化。
第六章 系统测试。对数据人生管理系统进行测试，主要包括单元测试、性能测试等。测试结果验证了系统的可靠性与稳定性。 
第七章 总结与展望。对本文的研究内容进行总结，并阐述该数据人生管理系统相比于以往系统的特点。针对未来物业的发展以及技术的更新，对系统提出改进与完善的方案。

## 1.2 国内外研究现状

类似数据人生管理系统的软件为知识库管理系统


### 1.2.1国内研究现状

国内软件主要有：语雀、石墨文档、飞书知识库、Obsidian
| 功能/Features          | 数据人生管理系统 | 语雀 | 石墨文档 | 飞书知识库 | Obsidian    |
| ---------------------- |:----------------:| ---- | -------- | ---------- | --- |
| 开源/非商业闭源        |        ✅        | ❌   |          |            |     |
| 数据安全性             |        ✅        | ❌   |          |            |     |
| 数据隐私性             |        ✅        |  ❌    |          |            |     |
| 支持插件拓展特殊数据           |        ✅        |   ❌   |          |            |     |
| 支持数据库离线导出、迁移   |        ✅        |   ❌   |          |            |     |
| 支持多端同步           |        ✅        |      |          |            |     |
| 支持markdown拓展       |        ✅        |   ❌   |          |            |     |
| 支持用户fork自构建版本 |        ✅        |   ❌   |          |            |     |
| 支持在线协作           |        ❌        |  ❌    |          |            |     |

### 1.2.2国外研究现状

国外商用软件主要有Notion，开源软件主要有：Affine


## 1.3 小 结

1. 框架原理分层绘图
2. app表格对比：Notion、Affine、Obsidian 分维度列出对比
3. 使用到的框架技术路线图说明 MVC -> 前端|后端|data模型->技术选型原因

需求：

·  日记语音输入保存，语音文字识别（讯飞识别）

·  数据统计、可视化（每日工作记录+时间戳）

功能性需求、性能需求、需求分析

《金字塔原理》

# 第2章 开题报告

## 2.1 主要研究内容

### 2.1.1 需求分析 


#### 2.1.1.1 系统需求概述

##### 2.1.1.2 可行性分析

##### 2.1.1.2.1 经济可行性

##### 2.1.1.2.2 技术可行性 

##### 2.1.1.2.3 操作可行性 



#### 2.1.1.3 功能性需求分析

##### 2.1.1.3.1 基础需求分析

##### 2.1.1.3.2 特殊需求分析



#### 2.1.1.4 非功能性需求分析

##### 2.1.1.4.1 安全性

##### 2.1.1.4.1 可拓展性

##### 2.1.1.4.1 可响应性




### 2.1.2 研究技术

#### 1.2.1 基于React的Next.js 框架在软件开发中的应用

柳海燕等[[1]](#_edn1)React是于2013年开源的web框架，React 将 DOM 抽象为虚拟 DOM 的特性，使我们在开发过程中无需担心性能问题可以根据需要随时刷新整个页面。张 根 [1]、秦子实[2]等用 React 构建网站前端开发，郝骏[3]、沈超[4]等用 React Native 开 发 原 生 移 动 应 用 ，SUBRAMANIAN V[5] 为 使 用 React 构建现代应用提供了完整技术栈解决方案，从而形成对 React 技术的完美补充。

Next.js是 Vercel公司基于React于2018年开源的fullstack web框架[[2]](#_edn2)，Next.js 将应用开发需要用到的各类琐碎功能整合的特性，并且具有server-side rendering (ssr) 功能加速页面渲染，使我们在开发数据人生管理系统时，可以做到快速构建应用敏捷开发并且减少性能问题的心智负担。

#### 1.2.2 基于Node.js的express框架在软件开发中的应用

Node是服务器端的JavaScript， 它将改变JavaScript 在服务器的工作方式它的目标是帮助开发者构建可伸缩且高度化的应用程序，编写能够处理上万条同时连接在一个物理机的高并发代码[]。

Express是基于Node.js的快速轻量级的web框架，一般被用来作为服务器后端使用。Saundariya 等[[3]](#_edn3) 研究了使用express框架的基础最佳实践

#### 1.2.3 桌面端开发的electron打包框架在软件开发中的应用

Electron打包框架由facebook公司开源。

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows、macOS和Linux上运行的跨平台应用——不需要本地开发经验。[[4]](#_edn4)

#### 1.2.4移动端开发的React Native框架在软件开发中的应用

陈海云等[[5]](#_edn5)React Native复用前端的框架，其执行语言是JavaScript,通过JSBridge桥接器去调用原生组件绘制原生页面的UI这种方案是解决前端直接渲染UI由于技术上的实现导致性能体验不足的问题, React Native的优势还在于其目前生态在跨平台领域是相对稳健强壮的，其开源库和用户数都较多，且在较多移动应用上已经得到了实践的验证。


三端技术：








## 2.2 研究方案或设计方案





## 2.3 毕业设计成果

成果将全部开源至GitHub[https://github.com]


## 2.4 时间安排



参考文献

  

---

[[1]](#_ednref1) 柳海燕;郑健; 基于React和Express的接待工作管理系统的设计与实现[J/OL]. 电脑知识与技术, 2021(17 vo 17): 10-13. DOI:10.14004/j.cnki.ckt.2021.1536.

[[2]](#_ednref2) vercel/next.js: The React Framework[EB/OL]. [2023-01-13]. https://github.com/vercel/next.js.

[[3]](#_ednref3) SAUNDARIYA K, ABIRAMI M, KUMARAN S R, 等. WEBAPP SERVICE FOR BOOKING HANDYMAN USING MONGODB, EXPRESS JS, REACT JS, NODE JS[C/OL]//ICSPC’21: 2021 3RD INTERNATIONAL CONFERENCE ON SIGNAL PROCESSING AND COMMUNICATION (ICPSC). 2021: 180-183. DOI:10.1109/ICSPC51351.2021.9451783.

[[4]](#_ednref4) 简介 | Electron[EB/OL]. [2023-01-19]. https://electronjs.org/zh/docs/latest/.

[[5]](#_ednref5) 陈海云, 李学庆. 基于React Native的移动应用开发模版的设计与实现[D]. 山东大学, 2021.