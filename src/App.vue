<template>
  <main id="app">
    <div class="grid-main">
      <scripts-panel
        @selected="loadScript($event)"
        v-bind:scripts="scripts"
        v-bind:selected="script"
      ></scripts-panel>
      <script-view v-bind:script="script"></script-view>
    </div>
  </main>
</template>

<script>
import ScriptView from "./components/ScriptView.vue";
import ScriptsPanel from "./components/ScriptsPanel.vue";
import { Script } from "./script";

export default {
  name: "App",
  components: {
    ScriptView,
    ScriptsPanel
  },
  data() {
    return {
      scripts: [],
      script: null
    };
  },
  methods: {
    loadScript(script_id) {
      this.$http.get(process.env.VUE_APP_API_URL + "/script/" + script_id).then(res => {
        this.script = new Script(res.body, script_id, this.$http);
        this.script.getPreviev(this.$http);
      });
    }
  },
  created: function() {
    this.$http.get(process.env.VUE_APP_API_URL + "/script").then(res => {
      this.scripts = res.body;
      this.loadScript(this.scripts[0].script);
    });
  }
};
</script>

<style>
main {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

.grid-main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  height: 100%;
}
</style>
