<template>
  <div class="grid-scripts w3-theme-l4 script-list" v-if="selected_script">
    <div
      v-for="item in scripts"
      @click.prevent="$emit('selected', item.script)"
      class="w3-card w3-hover-shadow w3-white w3-center"
      v-bind:key="item.script"
    >
      <div v-bind:class="getTileStyling(item.script)">
        <h5>{{ item.script }}</h5>
      </div>
      <img v-bind:src="item.image" class="thumbnail" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ScriptList",
  props: ["scripts", "selected_script"],
  methods: {
    getTileStyling(script) {
      let classes = ["w3-container"];
      classes.push(
        script === this.selected_script.id ? "w3-theme-d4" : "w3-theme"
      );
      return classes;
    }
  }
};
</script>

<style scoped>
.script-list {
  overflow-y: scroll;
  height: calc(100vh - 60px);
}
</style>