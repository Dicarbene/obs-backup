When you mutate a reactive state in `Vue.js`, the resulting DOM updates are not applied synchronously. 

`Vue.js` provides a utility for waiting for the next DOM update flush. Lets Go 👇: 

```vue
<script setup>
import { ref } from "vue"

const count = ref(0)

function increment() {
  count.value++

  /**
   * DOM is not yet updated, how can we make sure that the DOM gets updated
   * Make the output be true
  */

  console.log(+document.getElementById("counter").textContent === 1)
}
</script>

<template>
  <button id="counter" @click="increment">
    {{ count }}
  </button>
</template>


```

## Solution

```vue
// App.vue
<script setup>
import { ref, nextTick } from 'vue';

const count = ref(0);
const counter = ref(null);

function increment() {
  count.value++;

  /**
   * DOM is not yet updated, how can we make sure that the DOM gets updated
   * Make the output be true
   */
  nextTick(() => {
    console.log(+counter.value.textContent === 1);
  });
}
</script>

<template>
  <button ref="counter" @click="increment">
    {{ count }}
  </button>
</template>

```


```ts
//index.test.ts

import { mount } from "@vue/test-utils"
import { describe, it, expect, vi } from "vitest"

import App from "./App.vue"

describe("next-dom-update", () => {
  it("should work'", async() => {
    let printLog = ''
    console.log = vi.fn(
      (log: string) => {
        printLog = log?.toString()?.trim()
      })
    const wrapper = mount(App)

    expect(wrapper.text()).toMatchInlineSnapshot("\"0\"")

    const button = wrapper.find("button")
    await button.trigger("click")

    expect(wrapper.text()).toMatchInlineSnapshot('"1"')
    expect(printLog).toMatchInlineSnapshot('"true"')
  })
})

```