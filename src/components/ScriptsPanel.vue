<template>
  <div class="left-panel">
    <menu class="w3-theme-d4">
      <input v-model="script_filter" class="w3-input w3-border" placeholder="Search..." />
    </menu>
    <script-list
      v-bind:scripts="filtered_scripts"
      v-bind:selected_script="selected"
      v-on="$listeners"
    ></script-list>
  </div>
</template>

<script>
import ScriptList from "./ScriptList.vue";

export default {
  name: "ScriptsPanel",
  components: {
    ScriptList
  },
  props: ["scripts", "selected"],
  data() {
    return {
      script_filter: ""
    };
  },
  computed: {
    filtered_scripts() {
      return this.scripts.filter(script => {
        return script.script
          .toLowerCase()
          .includes(this.script_filter.toLowerCase());
      });
    }
  }
};
</script>