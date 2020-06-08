Vue.component('scriptinput', {
    props: ['script', 'image_catalog'],
    template: `
    <div v-if="script">
        <div class="title">
            <h2>{{ script.name}}</h2>
            <p>{{ script.description }}</p>
        </div>
        <div class="grid-inputs">
            <div>
                <div v-for="item in script.params" v-bind:item="item">                
                    <label class="w3-text-blue">{{ item.name }}</label>
                    <template v-if="item.allowed">
                        <select v-model="item.value" class="w3-input w3-border">
                            <option v-for="option in item.allowed" v-bind:value="option">{{ option }}</option>
                        </select>
                    </template>
                    <template v-else-if="item.type === 'category'">
                        <select v-model="item.value" class="w3-input w3-border" @change="selectCategory(item.value)">
                            <option v-for="(value, key) in image_catalog" v-bind:value="key">{{ key }}</option>
                        </select>
                    </template>
                    <template v-else-if="item.type === 'image'">
                        <select v-model="item.value" class="w3-input w3-border">
                            <option v-for="image in images" v-bind:value="image">{{ image }}</option>
                        </select>
                    </template>
                    <template v-else>
                        <input v-if="item.type === 'string'" type="text" v-model="item.value" class="w3-input w3-border">
                        <input v-else type="number" v-model="item.value" class="w3-input w3-border">
                    </template>
                    <p>{{ item.description }}</p>
                </div>
            </div>
            <div v-bind:class="{'preview-container-loading': script.preview_loading, 'preview-container': !script.preview_loading}">
                <img v-bind:src="script.preview" v-if="!script.preview_loading"> 
            </div>
        </div>
    </div>
    `,
    methods: {
        selectCategory(category) {
            this.script.selected_category = category;
            var image = this.script.params.find(e => e.type === 'image');
            image.value = this.images[0];
        }
    },
    computed: {
        images() {
            return(this.image_catalog[this.script.selected_category]);
        }
    }
});