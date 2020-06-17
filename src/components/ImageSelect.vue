<template>
  <div>
    <input v-model="filter" class="w3-input w3-border" placeholder="Search..." />
    <div class="grid-images">
      <i
        v-for="image in images"
        class="w3-hover-theme"
        :class="iconClass(param, image)"
        @click.prevent="$emit('imageSelected', param, image)"
        v-bind:key="image.path"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSelect",
  props: ["image_catalog", "param"],
  data() {
    return {
      filter: ""
    };
  },
  methods: {
    iconClass(parameter, image) {
      var classes = [];
      classes.push(image.cssClass);
      classes.push("fa-" + image.name);
      if (parameter.value.name === image.name) {
        classes.push("w3-theme");
      }
      return classes;
    }
  },
  computed: {
    images() {
      if (this.image_catalog !== null) {
        return this.image_catalog.filter(image => {
          return image.path.toLowerCase().includes(this.filter.toLowerCase());
        });
      } else return [];
    }
  }
};
</script>