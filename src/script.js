export class FontawesomeImage {
  constructor(path) {
    this.path = path;
    [this.category, this.name] = path.split("/");
    this.cssClass = {
      solid: "fas",
      regular: "far",
      brands: "fab",
    }[this.category];
  }
}

export class Script {
  constructor(script, id, http) {
    this.params = script.params;
    this.params.forEach((item) => {
      if (item.type === "image") {
        item.value = new FontawesomeImage(item.value);
      }
    });
    this.name = script.name;
    this.description = script.description;
    this.author = script.author;
    this.url = script.url;
    console.log('author ' + this.author);
    this.id = id;
    this.preview_loading = true;
    this.$http = http;
    this.source = script.source;
  }

  postData() {
    var postData = { script: this.id };
    this.params.forEach((param) => {
      if (param.type === "image") {
        postData[param.var_name] = param.value.path;
        console.log(param.value.path);
      } else postData[param.var_name] = param.value;
    });
    return postData;
  }
}
