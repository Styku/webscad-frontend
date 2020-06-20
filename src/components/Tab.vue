<template>
  <div :style="[isActive ? {'display': 'block'} : {'display': 'none'}]" class="tab-box w3-border-theme">
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
  border: 2px solid;
}
</style>