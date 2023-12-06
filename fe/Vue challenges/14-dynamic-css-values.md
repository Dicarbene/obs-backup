SFC `<style>` tags support linking CSS values to dynamic components.

Do you know what it is?. Lets try it 👇: 

```vue
<script setup>
import { ref } from "vue"
const theme = ref("red")

const colors = ["blue", "yellow", "red", "green"]

setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)]
}, 1000)

</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* Modify the code to bind the dynamic color */
p {
  color: red
}
</style>

```

## Solution

```vue
// App.vue
<script setup>
import { ref } from "vue"
const theme = ref("red")

const colors = ["blue", "yellow", "red", "green"]

setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)]
}, 1000)

</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* Modify the code to bind the dynamic color */
p {
  color: v-bind(theme);
}
</style>

```