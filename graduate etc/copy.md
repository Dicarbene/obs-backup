
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

前端页面采用基于 React 的Next.js框架，搭配 RadixUI 与 TailwindCSS 构建，配合Electron与 React Native有效解决了客户端多端访问问题和页面性能问题。后端采用 Next.js配合轻量级后端express ORM ·sqlite3·进行开发，极大地提高了开发效率。项目开放了用户自建数据库服务并支持webdav 协议，在方便用户管理个人隐私数据同时，也使用户方便的在多端传输数据。

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

类似数据人生管理系统的软件为知识库管理系统，下列软件基本为此类


### 1.2.1国内研究现状

国内软件主要有：语雀、石墨文档、飞书知识库、Obsidian等

#### 语雀

语雀是一款团队协作知识管理工具，它可以帮助团队成员共享、整理、组织以及查找信息。语雀提供了丰富的功能，例如文档编写、团队协作、任务管理、项目管理、文件存储等。

语雀的特点是简单易用，不需要任何技术基础即可上手。语雀采用了类似于Markdown的语法，使得用户可以快速编写高质量的文档。语雀还提供了丰富的团队协作功能，团队成员可以共同完成文档的编写、评论、修订等任务。

语雀的任务管理功能非常强大，团队成员可以通过语雀统一管理任务，并且可以实时查看任务的进度情况。语雀还提供了项目管理功能，团队可以通过语雀统一管理项目，并且可以实时查看项目的进展情况。
语雀支持文件存储，团队成员可以方便地在语雀中存储文件，并且可以在语雀中查找文件。语雀还支持数据备份和恢复，团队可以随时备份语雀上的数据，并且可以随时恢复数据。

语雀的安全性高，语雀采用了高级的数据加密技术，保证了团队数据的安全性。语雀的隐私保护功能也非常完善，团队成员可以自主决定谁可以访问他们的文档。

另外，语雀还支持移动端使用，团队成员可以通过语雀的移动端应用随时随地管理任务、项目和文档。语雀提供了丰富的API，团队可以通过语雀的API与其他系统进行整合，从而提高团队的工作效率。

总之，语雀是一款十分优秀的团队协作知识管理工具，它可以帮助团队成员快速、高效地管理、共享信息。语雀的易用性、功能丰富、安全性高等特点，使得它成为了越来越多团队选择的知识管理工具。

#### 石墨文档

石墨文档是一个强大的文档协作平台，提供了各种实用工具，帮助团队高效协作。该产品可以在云端访问和编辑文档。它还提供了完整的审核流程，确保团队内的所有文档都是最新的，信息是正确的。

石墨文档还具有强大的安全性能，能够防止未经授权的访问，以确保数据的保密性。用户可以随时随地访问和编辑文档，而不必担心数据丢失或不可用。

此外，石墨文档还提供了各种模板，方便用户快速创建文档。它支持多种格式，可以在平台上轻松转换，从而更好地满足用户的需求。

总的来说，石墨文档是一款非常实用的协作平台，提供了全面的功能，适用于各种团队协作场景。它能够提高协作效率，减少冲突，保证数据安全。如果您正在寻找一款高效、安全、易用的协作工具，石墨文档是一个非常不错的选择。

#### 飞书知识库
飞书知识库是一个全新的、功能强大的团队知识管理平台。它将整合团队的知识资源，并通过高效的搜索算法和人工智能技术提供快速、准确的检索。

飞书知识库不仅支持各种文件格式，还支持团队成员创建、编辑、分享知识库中的条目，并在即时通讯、任务管理等功能的基础上为团队成员提供知识共享和协作的平台。

另外，飞书知识库拥有丰富的数据分析和可视化功能，可以帮助团队成员了解知识资源的利用情况，并且可以通过数据支持优化知识管理工作。

总体而言，飞书知识库是一个完美的团队知识管理解决方案，它将整合团队的知识资源，提供卓越的知识管理工具和方法，帮助团队成员更有效地利用和共享知识资源，提高团队效率和协作能力。

#### Obsidian
Obsidian是一款先进的知识管理工具，专为个人和团队提供有效组织、沉淀和分享知识的能力。Obsidian以独特的链接机制为核心，允许用户通过自然语言方式建立连接，构建复杂的知识图谱。它的本地存储方式保证了数据的安全性和灵活性，因此没有网络的限制，您随时随地都可以访问您的知识库。

Obsidian拥有强大的搜索功能，使您可以轻松查找所需的信息。它还提供了富有创意的写作体验，让您在不浪费时间的情况下更高效地创建和整理笔记。此外，Obsidian还支持Markdown语法，使您可以轻松地编写和编辑格式良好的文档。

总的来说，Obsidian是一款功能强大的知识管理工具，适用于个人和团队。它提供了高效的数据管理能力，并且具有易用性和安全性，帮助您最大限度地提高效率并实现知识共享。

#### 总结

| 功能/Features          | 数据人生管理系统 | 语雀 | 石墨文档 | 飞书知识库 | Obsidian    |
| ---------------------- |:----------------:| ---- | -------- | ---------- | --- |
| 开源/非商业闭源        |        ✅        | ❌   |    ❌      |     ❌       |   ❌  |
| 数据安全性             |        ✅        | ✅   |     ✅     |      ✅      |   ❌  |
| 数据隐私性             |        ✅        |  ❌    |     ❌     |     ❌       |   ✅  |
| 支持插件拓展特殊数据           |        ✅        |   ❌   |    ❌      |     ❌       |  ✅   |
| 支持数据库离线导出、迁移   |        ✅        |   ❌   |     ❌     |      ❌      |   ✅  |
| 支持多端同步           |        ✅        |   ✅   |     ✅     |      ✅      |  ✅   |
| 支持markdown拓展       |        ✅        |   ❌   |     ❌     |       ❌     |   ✅  |
| 支持用户fork自构建版本 |        ✅        |   ❌   |     ❌     |      ❌      |  ❌   |
| 支持在线协作           |        ❌        |  ✅    |     ✅     |       ✅     |  ❌   |

### 1.2.2国外研究现状

国外商用软件主要有Notion，开源软件主要有：Affine

#### Notion
Notion是一款功能强大且易用的知识管理工具。它可以帮助用户组织、储存和共享信息。该产品拥有灵活的笔记系统，可以方便地整理文字、图片、链接等内容。
Notion的核心优势是灵活性和适用性。该产品的高度自定义的结构可以适应各种需求，可以用作任务管理工具，知识库，文档管理系统，也可以是个人笔记应用。Notion同时支持团队合作和个人使用，可以与团队共享任务和文件，并可以在团队中评论和协作。

Notion拥有强大的搜索功能，可以轻松检索内容，并具有良好的数据可视化功能，便于对信息进行分析和总结。此外，Notion还支持数据导入和导出，可以方便地与其他应用程序或服务集成，提高工作效率。

总体来说，Notion是一款优秀的组织和管理知识和任务的工具，具有高度灵活性，适用性强，同时也具有协作和沟通的功能，适合各种用户和行业需求。使用Notion，用户可以更高效地管理工作内容，提高工作效率，并为团队带来更好的协作体验。

#### Affine
Affine是一个全新的组织工具，帮助团队更有效地工作。该产品提供了一个统一的平台，以管理所有工作流程，包括任务跟踪，项目计划，文档管理等。Affine还为团队成员提供了一个直观的界面，使他们可以更方便地访问信息并与其他团队成员合作。该产品还可以与其他第三方工具，如Slack，GitHub等集成，提供更强大的功能。总而言之，Affine是一个有力的团队管理工具，它可以提高团队协作效率，改善工作流程，帮助团队更快地完成任务。


| 功能/Features            | 数据人生管理系统 | Notion | Affine    |
| ------------------------ |:----------------:| ------ | --- |
| 开源/非商业闭源          |        ✅        |    ❌    |  ✅   |
| 数据安全性               |        ✅        |    ❌    |  ❌   |
| 数据隐私性               |        ✅        |    ✅    |  ✅   |
| 支持插件拓展特殊数据     |        ✅        |    ✅    |  ❌   |
| 支持数据库离线导出、迁移 |        ✅        |     ✅   |   ✅  |
| 支持多端同步             |        ✅        |    ✅    |  ❌   |
| 支持markdown拓展         |        ✅        |    ✅    |   ✅  |
| 支持用户fork自构建版本   |        ✅        |    ❌    |   ✅  |
| 支持在线协作             |        ❌        |   ✅     |  ✅   |


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

对系统进行需求分析是开发数据人生管理系统的必要前提，需求分析是指根据数据人生管理的相关需求对整个系统的功能以及性能等进行分析，为系统的设计和开发奠定基础。本章将开展对数据人生管理系统的需求分析。

#### 2.1.1.1 系统需求概述

##### 2.1.1.2 可行性分析
在系统开发前，必须对其可行性进行分析，确定当前的技术积累，资金投入以及各种资源是否能够支持该系统的开发。本节主要从经济、技术等方面对系统进行可行性分析。
##### 2.1.1.2.1 经济可行性
在物业管理系统投入使用后，如果其产生的综合效益大于前期系统开发以及后期运维的成本，则在经济上认为是可行的。从物业管理系统将采用的技术栈以及技术架构设计来看，开发成本并不太高。尽管在初期，物业管理系统的引入可能会增加成本，但是就长期而言，物业管理系统能降低物业各项事务中的人为参与程度，减少小区的管理成本。综合以上条件，开发物业管理系统在经济上是可行的。
##### 2.1.1.2.2 技术可行性 
在系统开发前，必须要对所使用的相关技术进行分析，以保证从技术层面上可以支持开发人员完成对物业管理系统功能和性能上的最终实现。在该系统的开发过程中，主要采用了 React、Flask 等相关技术，目前这些技术经过不断地更新迭代，已经发展得十分完善，通过这些技术可以使系统开发顺利进行。当前无论是硬件支撑还是软件开发技术都可以很好地达到物业管理系统开发的需求，因此在技术上是可行的。
##### 2.1.1.2.3 操作可行性 
操作可行性用于评估系统开发完成后，用户交互的良好程度以及用户的使用体验。只有在物业管理工作人员能够方便，快捷地对系统进行操作的情况下，物业管理系统才能够被物业公司投入实际使用。对于此系统，页面设计友好，且使用了相关技术进行了性能上的优化，物业管理人员可以很快对系统的操作上手。因此该系统具备操作可行性


#### 2.1.1.3 功能性需求分析

##### 2.1.1.3.1 基础需求分析

##### 2.1.1.3.2 特殊需求分析



#### 2.1.1.4 非功能性需求分析

##### 2.1.1.4.1 安全性
安全性主要有以下几个方面，首先在日常操作中，应该确保系统可以正常地进行访问和运行。其次对于系统中存储的物业相关信息，需要保证其绝对安全性，不能泄漏。同时，如果系统出现故障，造成系统无法正常响应或服务器发生崩溃时，需要有能够恢复的手段。
##### 2.1.1.4.1 可拓展性
由于个人数据管理的业务特性，在未来的发展过程中会不断出现新的需求，这就需要在开发的过程中确保系统具备较高的可扩展性。因此，应当充分调研现有的技术，并选取合适的技术栈进行开发，同时规范接口标准、模块化编程，提高代码的可维护性以方便系统的扩展。
##### 2.1.1.4.1 响应高效性
在用户对系统进行日常使用时，用户的每一次交互操作，系统都应该在合理且用户能够接受的时间内进行响应。否则，若系统迟迟不能响应，需要消耗用户大量的等待时间，这对用户的使用是极不友好的。






### 2.1.2 研究技术

数据人生管理系统包含三端：网页端、桌面端、移动端

前端框架、后端框架、前后端交互技术、数据库。
本文采用 Next.js 作为前端框架，Next.js 框架负责生成前端页面相关代码，，通过Nginx 服务器发送给用户浏览器；后端服务器在接收到用户请求后对数据库进行创建、读取、修改和删除操作；用户浏览器使用 AJAX 前后端交互技术与后端服务器通信并根据响应结果动态更新页面。

在网页端，前端使用了Next.js、React、TailwindCSS、RadixUI、Zustand等技术，并使用了动画技术，包括AutoAnimate和FramerMotion以优化UX体验。后端使用Node.js、tRPC、prisma，prisma作为ORM连接sqlite数据库进行数据操纵。使用Next.js、Zod、NextAuth.js等技术作为中间件。

桌面端也使用了类似的前端和后端技术，并且还使用了win/mac/linux的本地API，通过Node.js、Electron技术来实现。

移动端主要使用了前端技术，同时也使用了android/ios的本地API，并且使用了ReactNative技术和sqlite数据库。


#### 1.2.1 基于React的Next.js 框架在软件开发中的应用

Next.js是 Vercel公司基于React于2018年开源的fullstack web框架[[2]](#_edn2)，Next.js 将应用开发需要用到的各类琐碎功能整合的特性，并且具有server-side rendering (ssr) 功能加速页面渲染，使我们在开发数据人生管理系统时，可以做到快速构建应用敏捷开发并且减少性能问题的心智负担。
Next.js是一款基于React框架的开源框架，用于构建高性能的Web应用。它针对于服务端渲染（SSR）和静态导出（static export）提供了一整套解决方案，帮助开发者构建快速，安全，可靠的Web应用。

Next.js的一个显著特点是对服务端渲染的全面支持。服务端渲染是一种Web应用的技术，可以在服务器端构建页面，从而有效地提高页面的加载速度。Next.js不仅支持服务端渲染，而且还帮助开发者解决了服务端渲染带来的一系列问题，例如路由，数据请求和代码分割等。

另一个重要的优点是静态导出的强大支持。静态导出是指将Web应用导出为静态HTML，CSS和JavaScript文件的过程。Next.js提供了一整套解决方案，帮助开发者快速静态导出Web应用，从而提高Web应用的可靠性和安全性。
总的来说，Next.js是一款高效，易用，功能强大的Web应用框架，适用于各种Web应用的开发。

#### 1.2.2 基于Node.js的express框架在软件开发中的应用

Node是服务器端的JavaScript， 它将改变JavaScript 在服务器的工作方式它的目标是帮助开发者构建可伸缩且高度化的应用程序，编写能够处理上万条同时连接在一个物理机的高并发代码[]。

Express是基于Node.js的快速轻量级的web框架，一般被用来作为服务器后端使用。Saundariya 等[[3]](#_edn3) 研究了使用express框架的基础最佳实践

#### 1.2.3 桌面端开发的electron打包框架在软件开发中的应用

Electron打包框架由facebook公司开源。

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows、macOS和Linux上运行的跨平台应用——不需要本地开发经验。[[4]](#_edn4)

#### 1.2.4移动端开发的React Native框架在软件开发中的应用

陈海云等[[5]](#_edn5)React Native复用前端的框架，其执行语言是JavaScript,通过JSBridge桥接器去调用原生组件绘制原生页面的UI这种方案是解决前端直接渲染UI由于技术上的实现导致性能体验不足的问题, React Native的优势还在于其目前生态在跨平台领域是相对稳健强壮的，其开源库和用户数都较多，且在较多移动应用上已经得到了实践的验证。


三端技术：







#### sqlite

SQLite 是一个进程内库，它实现了一个独立的、无服务器的、零配置的、事务性的 SQL 数据库引擎。SQLite 的代码属于公共领域，因此可以免费用于任何目的，无论是商业用途还是私人用途。 
SQLite 是世界上部署最广泛的数据库，其应用程序多得我们数不过来，其中包括几个备受瞩目的项目。SQLite 是一个嵌入式 SQL 数据库引擎。与大多数其他 SQL 数据库不同，SQLite 没有单独的服务器进程。 SQLite 直接读写普通磁盘文件。具有多个表、索引、触发器和视图的完整 SQL 数据库包含在单个磁盘文件中。数据库文件格式是跨平台的——您可以在 32 位和 64 位系统之间或大端和小端架构之间自由复制数据库。这些特性使 SQLite 成为应用程序文件格式的流行选择。 SQLite 数据库文件是美国国会图书馆推荐的存储格式。不要将 SQLite 视为 Oracle 的替代品，而是将其视为 fopen() 的替代品。
SQLite 是一个紧凑的库。启用所有功能后，库大小可以小于 750KiB，具体取决于目标平台和编译器优化设置。 （64 位代码更大。一些编译器优化，如激进的函数内联和循环展开，可能导致目标代码更大。）内存使用和速度之间存在权衡。 SQLite 通常运行得越快，你给它的内存越多。尽管如此，即使在低内存环境中，性能通常也相当不错。根据使用方式，SQLite 可能比直接文件系统 I/O 更快。


SQLite 是一个使用 C 语言开发的轻量级嵌入式数据库，它的体积小，集成度高，同时还拥有无需配置，可靠安全等特性。SQLite 能直接嵌入到应用程序中，用户不需要进行安装，也不需要开启单独的系统进程来进行支持，开发者在使用时，将 SQLite 源码和相关库文件导入到项目中，就可以实现对数据库的相关操作，同时它还提供了丰富的 API 接口。Prisma 内部集成了SQLite3操作api，可以让开发人员直接在 JavaScript 中对数据库进行使用。
数据人生管理系统中的大部分事务为 INSERT 与 UPDATE，SQLite 官方网站公布的结果显示，对一个有索引的表执行 25000 次 INSERT，SQLite2.7.6 异步版本耗时 1.402 秒，PostgreSQL 与 MySQL 则分别耗时 8.175 秒、3.197 秒，这种情况下 SQLite 的性能远高于 PostgreSQL 与 MySQL。SQLite 在大数据量的情况下表现较差，但是物业管理系统一般情况下数据量不超过5 万，而SQLite 在100万数据量以下时表现不错。因此，SQLite 数据库能够满足本系统的需求。

## 2.2 研究方案或设计方案

![[Pasted image 20230213033213.png]]

### 项目网页端基础文件夹结构

```
.
├─ public
│  └─ favicon.ico
├─ prisma
│  └─ schema.prisma
├─ src
│  ├─ env.mjs
│  ├─ pages
│  │  ├─ _app.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ [...nextauth].ts
│  │  │  └─ trpc
│  │  │     └─ [trpc].ts
│  │  └─ index.tsx
│  ├─ server
│  │  ├─ auth.ts
│  │  ├─ db.ts
│  │  └─ api
│  │     ├─ routers
│  │     │  └─ example.ts
│  │     ├─ trpc.ts
│  │     └─ root.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ utils
│     └─ api.ts
├─ .env
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ next-env.d.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.cjs
├─ prettier.config.cjs
├─ README.md
├─ tailwind.config.cjs
└─ tsconfig.json
```

### `prisma`文件夹
`prisma` 包含了 `schema.prisma`文件，它被用于配置数据库连接和定义数据结构。数据库的迁移记录文件以及初始化种子脚本也会被放在这个文件夹里。

### `public`文件夹 
`public`包含了一些将被托管在服务器上的静态资源。例如文件 `favicon.ico`。

### `src/env`
用于环境变量的验证和类型定义

### `src/pages`
文件夹 pages 包含了 Next.js 应用的所有页面。根目录下的文件 index.tsx 则是应用程序的首页。文件 _app.tsx 被用于使用 provider 来包裹整个应用程序。

### `src/pages/api`
文件夹 api 包含了 Next.js 应用的 API 路由。文件 examples.ts（安装 Primsa 后会出现）包含了一段搭配 Prisma 使用 Next.js API 路由↗ 的示例代码。文件 restricted.ts（安装 Next-Auth 后会出现）则包含了一段受 NextAuth.js↗ 保护的示例路由代码，它同样也使用了 Next.js API 路由↗。

### `src/pages/api/auth/[...nextauth].ts`
文件 `[...nextauth].ts` 包含了 NextAuth.js 认证的动态 slug 路由。它被用于处理认证请求。参看 NextAuth.js 用法 来了解更多关于 NextAuth.js 的用法，以及 Next.js 动态路由文档↗ 来了解更多关于 catch-all 和 slug 路由的信息。

### `src/pages/api/trpc/[trpc].ts`
文件 `[trpc].ts` 是 tRPC API 的入口。它被用于处理 tRPC 请求。

### `src/server`
文件夹 server 被用于清晰划分服务端和客户端代码。

### `src/server/common`
文件夹 common 包含了常用的可复用服务端代码。

### `src/server/common/get-server-auth-session.ts`
文件 `get-server-auth-session.ts` 被用于在服务端获取 NextAuth.js 的 session。参看 NextAuth.js 用法 来了解更多。

### `src/server/db/client.ts`
文件 `client.ts` 被用于初始化一个全局的 Prisma 客户端。

### `src/server/trpc`
文件夹 trpc 包含了 tRPC 服务端的代码。

### `src/server/trpc/context.ts`
文件 `context.ts` 被用于创建上下文，该上下文会被用于 tRPC 的请求里。

### `src/server/trpc/trpc.ts`
文件 `trpc.ts` 被用于导出路由 procedure 的 helper 函数。

### `src/server/trpc/router`
文件夹 `router` 包含了 tRPC 的路由。

### `src/server/trpc/router/_app.ts`
文件 `_app.ts` 主要用于合并多个 tRPC 路由，并将它统一导出为一个路由，以及其对应的类型定义。

### `src/server/trpc/router/auth.ts`
文件 `auth.ts` 包含了一段 tRPC 路由的示例代码，它利用了 `protectedProcedure` 来展示如何用 NextAuth.js 来保护 tRPC 路由。


### `src/styles`
文件夹 styles 包含了应用的全局样式。

### `src/types`
文件夹 types 被用于存储复用的类型或类型声明。

### `src/types/next-auth.d.ts`
文件 `next-auth.d.ts` 被用于扩展 `NextAuth` 的默认 session 类型，这里将用户 ID 也添加了进来。

#### `src/utils`
文件夹 `utils` 被用于存储经常复用的工具函数。

#### `src/utils/trpc.ts`
文件 `trpc.ts` 是 tRPC 的前端入口。

#### `.env`
文件 `.env` 被用于保存环境变量。该文件不应该被提交到 git 历史记录里。

`.env.example`
文件 `.env.example` 根据所选库包展示了一个环境变量示例配置。这个文件需要被提交到 git 历史记录里。

`.eslintrc.json`
文件 `.eslintrc.json` 被用于配置 ESLint。

`next-env.d.ts`
文件 `next-env.d.ts` 确保 TypeScript 编译器能够采用 Next.js 的类型。你不应该移除或修改该文件，因为它可以随时发生变化。

`next.config.mjs`
文件 `next.config.mjs` 被用于配置 Next.js。

`postcss.config.cjs`
文件 `postcss.config.cjs` 被用于配置 TailwindCSS 的用法。

`prettier.config.cjs`
文件 `prettier.config.cjs` 被用于配置 Prettier，以使用插件 `prettier-plugin-tailwindcss` 来格式化 Tailwind CSS 的类名。

`tsconfig.json`
文件 `tsconfig.json` 被用于配置 TypeScript。

## 2.3 毕业设计成果

成果将全部开源至GitHub[https://github.com/dicarbene]


## 2.4 时间安排



参考文献

  

---

[[1]](#_ednref1) 柳海燕;郑健; 基于React和Express的接待工作管理系统的设计与实现[J/OL]. 电脑知识与技术, 2021(17 vo 17): 10-13. DOI:10.14004/j.cnki.ckt.2021.1536.

[[2]](#_ednref2) vercel/next.js: The React Framework[EB/OL]. [2023-01-13]. https://github.com/vercel/next.js.

[[3]](#_ednref3) SAUNDARIYA K, ABIRAMI M, KUMARAN S R, 等. WEBAPP SERVICE FOR BOOKING HANDYMAN USING MONGODB, EXPRESS JS, REACT JS, NODE JS[C/OL]//ICSPC’21: 2021 3RD INTERNATIONAL CONFERENCE ON SIGNAL PROCESSING AND COMMUNICATION (ICPSC). 2021: 180-183. DOI:10.1109/ICSPC51351.2021.9451783.

[[4]](#_ednref4) 简介 | Electron[EB/OL]. [2023-01-19]. https://electronjs.org/zh/docs/latest/.

[[5]](#_ednref5) 陈海云, 李学庆. 基于React Native的移动应用开发模版的设计与实现[D]. 山东大学, 2021.