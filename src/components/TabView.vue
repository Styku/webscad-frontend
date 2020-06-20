<template>
  <div class="tabview">
    <div>
      <button
        class="w3-bar-item w3-button"
        :class="{'w3-theme': i === active, 'w3-theme-l4':  i !== active}"
        @click="switchTab(i)"
        v-for="(tab, i) in tabs"
        :key="i"
      >{{ tab.title }}</button>
    </div>
    <div class="w3-border-theme">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  data: () => ({
    tabs: [],
    active: 0
  }),
  methods: {
    switchTab(id) {
      this.tabs[this.active].isActive = false;
      this.tabs[id].isActive = true;
      this.active = id;
    }
  },
  updated() {
    this.tabs = this.$children;
    this.tabs[this.active].isActive = true;
  }
};
</script>

<style scoped>
.tabview {
  margin: 20px;
}
</style>