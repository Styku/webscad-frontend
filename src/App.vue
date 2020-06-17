<template>
  <main id="app">
    <div class="grid-main">
      <div class="left-panel">
        <menu class="w3-theme-d4">
          <input v-model="script_filter" class="w3-input w3-border" placeholder="Search..." />
        </menu>
        <script-list
          v-bind:scripts="filtered_scripts"
          v-bind:selected_script="script"
          @selected="loadScript($event)"
        ></script-list>
      </div>
      <script-view v-bind:script="script" v-bind:image_catalog="image_catalog"></script-view>
    </div>
  </main>
</template>

<script>
import ScriptView from "./components/ScriptView.vue";
import ScriptList from "./components/scriptlist.vue";
import { Script, FontawesomeImage } from "./script";
import { BACKEND_URL } from "./host";

export default {
  name: "App",
  components: {
    ScriptView,
    ScriptList
  },
  data() {
    return {
      script_filter: "",
      scripts: [],
      image_catalog: null,
      selected_category: null,
      script: null
    };
  },
  methods: {
    loadScript(script_id) {
      this.$http.get(BACKEND_URL + "/script/" + script_id).then(res => {
        this.script = new Script(res.body, script_id, this.$http);
        this.script.getPreviev(this.$http);
      });
    }
  },
  created: function() {
    this.$http.get(BACKEND_URL + "/images").then(res => {
      this.image_catalog = res.body.images.map(x => new FontawesomeImage(x));
    });
    this.$http.get(BACKEND_URL + "/script").then(res => {
      this.scripts = res.body;
      this.loadScript(this.scripts[0].script);
    });
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
