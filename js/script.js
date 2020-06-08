import { BACKEND_URL } from './host.js'

export class Script {
    constructor(script, id, http) {
        this.params = script.params;
        this.name = script.name;
        this.description = script.description;
        this.id = id;
        this.preview_loading = true;
        this.$http = http;
        var category = this.params.find(e => e.type === 'category');
        this.selected_category = category.value ? category.value : null;
    }

    postData() {
        var postData = {script: this.id};
        this.params.forEach(param => {
            postData[param.var_name] = param.value;
        });
        return postData;
    }

    getPreviev() {
        this.preview_loading = true;
        this.preview = "/img/preloader.gif";
        this.$http.post(BACKEND_URL + "/render", this.postData(), {responseType: 'blob'})
            .then(response => {
                var headers = response.headers;
                var blob = new Blob([response.data],{type:'image/png'});
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                this.preview_loading = false;
                this.preview = imageUrl;
        });
    }

    getStl() {
        this.$http
        .post(BACKEND_URL + "/stl", this.postData(), {responseType: 'arraybuffer'})
        .then(response => {
            var headers = response.headers;
            var blob = new Blob([response.data],{type:headers['content-type']});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "keychain.stl";
            link.click();
        });
    }
}