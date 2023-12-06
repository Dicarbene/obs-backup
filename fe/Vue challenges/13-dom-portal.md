
---
done: false
created_time: "2023-04-01 22:49"
title: DOM传送门
author:
  name: webfansplz
  github: webfansplz
---

`Vue.js`提供了一个内置组件，将其插槽内容渲染到另一个DOM，成为该DOM的一部分。

你知道它是什么吗 ? 让我们试试👇:

```vue
<script setup>

const msg = "Hello World"

</script>

<template>
  <!-- 将以下元素渲染成`body`的子元素 -->
  <span>{{ msg }}</span>
</template>


```

### Solution

Time complexity: $O(n)$
Space complexity: $O(n)$

```ts
```