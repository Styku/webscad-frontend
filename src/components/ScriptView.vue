<template>
  <div>
    <menu class="w3-theme-d4">
      <button @click.prevent="getPreview(script)" class="w3-button w3-blue">Preview</button>
      <button @click.prevent="getStl(script)" class="w3-button w3-green">Render</button>
    </menu>
    <script-input
      v-bind:script="script"
      @changed="getPreview(script)"
    ></script-input>
  </div>
</template>

<script>
import ScriptInput from "./ScriptInput.vue";

export default {
  name: "ScriptView",
  components: {
    ScriptInput
  },
  props: ['script'],
  methods: {
    getStl(script) {
      script.getStl();
    },
    getPreview(script) {
      script.getPreviev();
    }
  }
};
</script>