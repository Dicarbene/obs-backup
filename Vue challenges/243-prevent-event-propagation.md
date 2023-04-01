---
difficulty: easy
title: 阻止事件冒泡
tags: Event Handling
author:
  github: murongg
  name: 木荣
---
In this challenge,you should make the click event's propagation to be stopped,let's go 👇: 


```vue
<script setup lang="ts">

const click1 = () => {
  console.log('click1')
}

const click2 = () => {
  console.log('click2')
}

</script>

<template>
  <div @click="click1()">
   <div @click="click2()">
     click me
   </div>
  </div>
</template>
```

## Solution

```vue
<script setup lang="ts">

const click1 = () => {
  console.log('click1')
}

const click2 = () => {
  console.log('click2')
}

</script>

<template>
  <div @click="click1()">
   <div @click.stop="click2()">
     click me
   </div>
  </div>
</template>
```