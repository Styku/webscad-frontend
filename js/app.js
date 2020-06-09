import { Script, FontawesomeImage } from './script.js';
import { BACKEND_URL } from './host.js'

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
            this.image_catalog = res.body.images.map(x => new FontawesomeImage(x));
        });
        this.$http.get(BACKEND_URL + "/script")
        .then(res => {
            this.scripts = res.body;
            this.loadScript(this.scripts[0].script);
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