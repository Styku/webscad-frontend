<template>
  <div>
    <div class="w3-bar w3-theme-d2">
      <button
        class="w3-bar-item w3-button"
        :class="{'w3-theme-d3': i === active}"
        @click="switchTab(i)"
        v-for="(tab, i) in tabs"
        :key="i"
      >{{ tab.title }}</button>
    </div>
    <div>
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