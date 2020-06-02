// Vue.directive('focus', {
//     inserted: function (el) {
//         el.focus()
//     }
// })

new Vue({
    el: '#app',
    data: {
        search_string: "",
        scripts: [],
        loaded_script: 'keychain',
        params: [],
        preview: ""
    },
    methods: {
        sendStlRequest() {
            postData = {script: this.loaded_script};
            this.params.forEach(param => {
                postData[param.var_name] = param.value;
            });
            this.$http
                .post("http://127.0.0.1:5000/stl", postData, {responseType: 'arraybuffer'})
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
            postData = {script: this.loaded_script};
            this.params.forEach(param => {
                postData[param.var_name] = param.value;
            });
            this.$http
                .post("http://127.0.0.1:5000/render", postData, {responseType: 'blob'})
                .then(response => {
                    var headers = response.headers;
                    var blob = new Blob([response.data],{type:'image/png'});
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(blob);
                    this.preview = imageUrl;
                    console.log(this.preview);
                });
        },
        sendScriptRequest(script) {
            this.$http.get('http://127.0.0.1:5000/script/' + script)
            .then(res => {
                this.params = res.body.params;
                this.loaded_script = script;
                this.sendPreviewRequest();
            })
        }
    },
    created: function() {
        this.$http.get('http://127.0.0.1:5000/script')
            .then(res => {
                this.scripts = res.body;
                this.sendScriptRequest('keychain');
            })
    }
});