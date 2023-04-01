In `JavaScript`, we always destructure/spread objects.

In `Vue.js`, we can also destructure/spread the `reactive` objects, but they will end up losing their reactivity.

How can we make sure that the destructured properties maintain their reactivity? Go ! 


```vue
<script setup lang="ts">
import { reactive } from "vue"

function useCount() {
  const state = reactive({
    count: 0,
  })

  function update(value: number) {
    state.count = value
  }

  return {
    state,
    update,
  }
}

// Ensure the destructured properties don't lose their reactivity
const { state: { count }, update } = useCount()

</script>

<template>
  <div>
    <p>
      <span @click="update(count-1)">-</span>
      {{ count }}
      <span @click="update(count+1)">+</span>
    </p>
  </div>
</template>

```


## Solution

