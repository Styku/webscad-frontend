<template>
  <div>
    <div class="grid-inputs">
      <div>
        <div v-for="item in script.params" v-bind:item="item" v-bind:key="item.var_name">
          <label class="w3-text-blue">{{ item.name }}</label>
          <template v-if="item.allowed">
            <select v-model="item.value" class="w3-input w3-border">
              <option
                v-for="option in item.allowed"
                v-bind:value="option"
                v-bind:key="option"
              >{{ option }}</option>
            </select>
          </template>
          <template v-else-if="item.type === 'image'">
            <image-select
              @imageSelected="selectImage"
              v-bind:image_catalog="image_catalog"
              v-bind:param="item"
            ></image-select>
          </template>
          <template v-else>
            <input
              v-if="item.type === 'string'"
              type="text"
              v-model="item.value"
              class="w3-input w3-border"
            />
            <input v-else type="number" v-model="item.value" class="w3-input w3-border" />
          </template>
          <p>{{ item.description }}</p>
        </div>
      </div>
      <div
        v-bind:class="{'preview-container-loading': script.preview_loading, 'preview-container': !script.preview_loading}"
      >
        <img v-bind:src="script.preview" v-if="!script.preview_loading" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageSelect from "./ImageSelect.vue";
import { FontawesomeImage } from "../script";

export default {
  name: "ScriptInput",
  props: ["script"],
  components: {
    ImageSelect
  },
  data() {
    return {
      image_catalog: null,
      filter: ""
    };
  },
  methods: {
    selectImage(parameter, image) {
      parameter.value = image;
      this.$emit("changed");
    }
  },
  created: function() {
    this.$http.get(process.env.VUE_APP_API_URL + "/images").then(res => {
      this.image_catalog = res.body.images.map(x => new FontawesomeImage(x));
    });
  }
};
</script>