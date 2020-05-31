// Vue.directive('focus', {
//     inserted: function (el) {
//         el.focus()
//     }
// })

new Vue({
    el: '#inputs',
    data: {
        search_string: "",
        params: []
    },
    methods: {
        sendStlRequest() {
            postData = {}
            this.params.forEach(param => {
                postData[param.name] = param.value;
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
        }
    },
    created: function() {
        this.$http.get('http://127.0.0.1:5000/script/keychain')
            .then(res => {
                this.params = res.body.params;
            })
    }
});