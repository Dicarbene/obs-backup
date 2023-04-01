---
difficulty: easy
done: false
created_time: "2023-04-01 20:40"
---

For this challenge, you'll use the `Composition API: Lifecycle Hooks` to complete the challenge. Here's what you need to implement 👇:

```vue
// Child.vue

<script setup lang="ts">
import { onMounted, inject } from "vue"

const timer = inject('timer')
const count = inject('count')


onMounted(() => {
  // The timer will work abnormally when the child component is toggled. Lets fix it.
  timer.value = window.setInterval(() => {
    count.value++
  }, 1000)
})

</script>

<template>
  <div>
    <p>
      Child Component: {{ count }}
    </p>
  </div>
</template>
```





### Solution


```vue
//App.vue
<script setup lang="ts">
import { ref, provide } from "vue"
import Child from "./Child.vue"

const visible = ref(true)
const timer = ref(null)
const count = ref(0)
provide("timer", timer)
provide("count", count)

function toggle() {
  visible.value = !visible.value
}
</script>

<template>
  <div>
    <Child v-if="visible" />
    <p>
      <button @click="toggle">
        Toggle Child Component
      </button>
    </p>
  </div>
</template>

```

```vue


```