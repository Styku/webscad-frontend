<template>
  <div>
    <menu class="w3-theme-d4">
      <button @click.prevent="getPreview(script)" class="w3-button w3-blue">Preview</button>
      <button @click.prevent="getStl()" class="w3-button w3-green">Render</button>
    </menu>
    <tab-view>
      <tab title="Input">
        <div class="title" v-if="script">
          <h2>{{ script.name}}</h2>
          <p>{{ script.description }}</p>
          <p v-if="script.author"><b>Author: </b>{{ script.author }}</p>
          <p v-if="script.url"><b>Link: </b><a :href="script.url" target="_blank">{{ script.url }}</a></p>
        </div>
        <script-input v-bind:script="script" @changed="getPreview()"></script-input>
      </tab>
      <tab title="Source">
        <source-code v-if="script">{{script.source}}</source-code>
      </tab>
    </tab-view>
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