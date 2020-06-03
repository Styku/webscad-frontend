const HOST = "127.0.0.1"
const BACKEND_URL = "http://" + HOST + ":5000";

new Vue({
    el: '#app',
    data: {
        script_filter: "",
        scripts: [],
        loaded_script: 'keychain',
        params: [],
        preview: "/img/preloader.gif",
        preview_loading: true,
        image_tree: null,
        selected_category: null
    },
    methods: {
        sendStlRequest() {
            postData = {script: this.loaded_script};
            this.params.forEach(param => {
                postData[param.var_name] = param.value;
            });
            this.$http
                .post(BACKEND_URL + "/stl", postData, {responseType: 'arraybuffer'})
                .then(response => {
                    var headers = response.headers;
                    var blob = new Blob([response.data],{type:headers['content-type']});
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "keychain.stl";
                    link.click();
                });
        },
        sendPreviewRequest() {
            this.preview_loading = true;
            this.preview = "/img/preloader.gif";
            postData = {script: this.loaded_script};
            this.params.forEach(param => {
                postData[param.var_name] = param.value;
            });
            this.$http
                .post(BACKEND_URL + "/render", postData, {responseType: 'blob'})
                .then(response => {
                    var headers = response.headers;
                    var blob = new Blob([response.data],{type:'image/png'});
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    this.preview_loading = false;
                    this.preview = imageUrl;
                });
        },
        sendScriptRequest(script) {
            this.$http.get(BACKEND_URL + "/script/" + script)
            .then(res => {
                this.params = res.body.params;
                this.loaded_script = script;
                var category_param = this.params.filter(e => {
                    if(e.type === 'category') {
                        return e;
                    }
                })
                this.selected_category = category_param.value;
                this.image_tree[this.selected_category];
                this.sendPreviewRequest();
            });
        }
    },
    created: function() {
        this.$http.get(BACKEND_URL + "/images")
        .then(res => {
            this.image_tree = res.body;
            for (var k in this.image_tree) { 
                this.selected_category = k; 
                break; 
            } 
            this.$http.get(BACKEND_URL + "/script")
            .then(res => {
                this.scripts = res.body;
                this.sendScriptRequest('keychain');
            });
        });


    },
    computed: {
        filtered_scripts() {
            return this.scripts.filter( script => {
                return script.script.toLowerCase().includes(this.script_filter.toLowerCase())
            });
        },
        images() {
            if(this.selected_category) {
                return this.image_tree[this.selected_category];
            }
            else return [];
        }
    }
});