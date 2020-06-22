<template>
  <div>
    <menu class="w3-theme-d4">
      <button @click.prevent="getSource()" class="w3-button w3-blue"><i class="fas fa-download"></i> Source</button>
      <button @click.prevent="getStl()" class="w3-button w3-blue"><i class="fas fa-download"></i> STL</button>
      <button @click.prevent="getPreview(script)" class="w3-button w3-green"><i class="fas fa-sync"></i> Preview</button>
    </menu>
    <div class="script-view">
      <div class="title" v-if="script">
        <h2>{{ script.name}}</h2>
        <p>{{ script.description }}</p>
        <p v-if="script.author">
          <b>Author:</b>
          {{ script.author }}
        </p>
        <p v-if="script.url">
          <b>Link: </b>
          <a :href="script.url" target="_blank">{{ script.url }}</a>
        </p>
      </div>
      <tab-view>
        <tab title="Input">
          <script-input v-if="script" v-bind:script="script" @changed="getPreview()"></script-input>
        </tab>
        <tab title="Source">
          <source-code v-if="script" :source="script.source"></source-code>
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import ScriptInput from "./ScriptInput.vue";
import TabView from "./TabView.vue";
import Tab from "./Tab.vue";
import SourceCode from "./SourceCode.vue";

export default {
  name: "ScriptView",
  components: {
    ScriptInput,
    TabView,
    Tab,
    SourceCode
  },
  props: ["script"],
  methods: {
    getStl() {
      this.$http
        .post(
          process.env.VUE_APP_API_URL + "/out/stl",
          this.script.postData(),
          { responseType: "arraybuffer" }
        )
        .then(response => {
          var headers = response.headers;
          var blob = new Blob([response.data], {
            type: headers["content-type"]
          });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "output.stl";
          link.click();
          window.URL.revokeObjectURL(link.href);
        });
    },
    getSource() {
      var link = document.createElement("a");
      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.script.source);
      link.download = this.script.name + '.scad';
      link.click();
    },
    getPreview() {
      this.script.preview_loading = true;
      this.script.preview = "/img/preloader.gif";
      this.$http
        .post(
          process.env.VUE_APP_API_URL + "/out/png",
          this.script.postData(),
          { responseType: "blob" }
        )
        .then(response => {
          var blob = new Blob([response.data], { type: "image/png" });
          var urlCreator = window.URL || window.webkitURL;
          var imageUrl = urlCreator.createObjectURL(blob);
          this.script.preview_loading = false;
          this.script.preview = imageUrl;
        });
    }
  },
  updated: function() {
    this.getPreview();
  }
};
</script>

<style scoped>
.script-view {
  max-height: calc(100vh - 60px);
  overflow: auto;
}
menu > button {
  margin-right: 5px;
}
</style>