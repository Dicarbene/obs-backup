Hello, World!

In Vue.js Challenges, we use the Vue.js SFC Playground based on [vuejs/repl](https://github.com/vuejs/repl) to code online and provided coding judge by `StackBlitz` & [Vitest](https://github.com/vitest-dev/vitest).

For this challenge, you will need to change the following code to make the page show "Hello World" correctly.

```vue
<script setup>
import { ref } from "vue"
const msg = ref("Hello World")
</script>

<template>
  <div>
    <!-- The output of the page is expected to be Hello World -->
    <h1>msg</h1>
  </div>
</template>

```