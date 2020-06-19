<template>
  <div>
    <menu class="w3-theme-d4">
      <button @click.prevent="getPreview(script)" class="w3-button w3-blue">Preview</button>
      <button @click.prevent="getStl()" class="w3-button w3-green">Render</button>
    </menu>
    <script-input v-bind:script="script" @changed="getPreview()"></script-input>
  </div>
</template>

<script>
import ScriptInput from "./ScriptInput.vue";

export default {
  name: "ScriptView",
  components: {
    ScriptInput
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