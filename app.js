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
    created: function() {
        this.$http.get('http://127.0.0.1:5000/script/keychain')
            .then(res => {
                this.params = res.body.params;
            })
    }
});