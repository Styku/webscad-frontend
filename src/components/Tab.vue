<template>
  <div :style="[isActive ? {'display': 'block'} : {'display': 'none'}]" class="tab-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: ["title"],
  data: () => ({
    isActive: false
  })
};
</script>

<style scoped>
.tab-box {
  overflow-y: scroll;
}
</style>