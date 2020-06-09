import { BACKEND_URL } from './host.js'

export class FontawesomeImage {
    constructor(path) {
        this.path = path;
        [this.category, this.name] = path.split('/');
        this.cssClass = {
            'solid': 'fas',
            'regular': 'far',
            'brands': 'fab'
        }[this.category];
    }
}

export class Script {
    constructor(script, id, http) {
        this.params = script.params;
        this.params.forEach(item => { 
            if(item.type === "image") {
                item.value = new FontawesomeImage(item.value);
            }
        });
        this.name = script.name;
        this.description = script.description;
        this.id = id;
        this.preview_loading = true;
        this.$http = http;
        this.source = script.source;
    }

    postData() {
        var postData = {script: this.id};
        this.params.forEach(param => {
            if(param.type === "image") {
                postData[param.var_name] = param.value.path;
                console.log(param.value.path);
            }
            else postData[param.var_name] = param.value;
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