const HOST = "127.0.0.1"
const BACKEND_URL = "http://" + HOST + ":5000";

class Script {
    constructor(script, id, http) {
        this.params = script.params;
        this.name = script.name;
        this.description = script.description;
        this.id = id;
        this.preview_loading = true;
        this.$http = http;
        var category = this.params.filter(e => {
            if(e.type === 'category') {
                return e;
            }
        });
        this.selected_category = category ? category.value : null;
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

Vue.component('scriptlist', {
    props: ['scripts', 'selected_script'],
    template: `
        <div class="grid-scripts w3-theme-l4" v-if="selected_script">
            <div v-for="item in scripts" @click.prevent="$parent.loadScript(item.script)" class="w3-card w3-hover-shadow w3-white w3-center">
                <div v-bind:class="{'w3-container': true, 'w3-theme': item.script != selected_script.id, 'w3-theme-d4': item.script == selected_script.id}">
                    <h5>{{ item.script }}</h5>
                </div>
                <img v-bind:src="item.image" class="thumbnail"> 
            </div>
        </div>
    `
});

Vue.component('scriptparam', {
    props: ['item'],
    template: `
    <div>
        <label class="w3-text-blue">{{ item.name }}</label>
        <template v-if="item.allowed">
            <select v-model="item.value" class="w3-input w3-border">
                <option v-for="option in item.allowed" v-bind:value="option">{{ option }}</option>
            </select>
        </template>
        <template v-else-if="item.type === 'category'">
            <select v-model="item.value" class="w3-input w3-border" @change="$parent.script.selected_category = item.value">
                <option v-for="(value, key) in $parent.image_catalog" v-bind:value="key">{{ key }}</option>
            </select>
        </template>
        <template v-else-if="item.type === 'image'">
            <select v-model="item.value" class="w3-input w3-border">
                <option v-for="image in $parent.image_catalog[$parent.script.selected_category]" v-bind:value="image">{{ image }}</option>
            </select>
        </template>
        <template v-else>
            <input v-if="item.type === 'string'" type="text" v-model="item.value" class="w3-input w3-border">
            <input v-else type="number" v-model="item.value" class="w3-input w3-border">
        </template>
        <p>{{ item.description }}</p>
    </div>
    `
});

new Vue({
    el: '#app',
    data: {
        script_filter: "",
        scripts: [],
        image_catalog: null,
        selected_category: null,
        script: null
    },
    methods: {
        getStl(script) {
            script.getStl();
        },
        getPreview(script) {
            script.getPreviev();
        },
        loadScript(script_id) {
            this.$http.get(BACKEND_URL + "/script/" + script_id)
            .then(res => {
                this.script = new Script(res.body, script_id, this.$http);
                this.script.getPreviev(this.$http);
            });
        }
    },
    created: function() {
        this.$http.get(BACKEND_URL + "/images")
        .then(res => {
            this.image_catalog = res.body;

        });
        this.$http.get(BACKEND_URL + "/script")
        .then(res => {
            this.scripts = res.body;
            this.loadScript('keychain');
        });
    },
    computed: {
        filtered_scripts() {
            return this.scripts.filter( script => {
                return script.script.toLowerCase().includes(this.script_filter.toLowerCase())
            });
        }
    }
});