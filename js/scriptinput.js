import { FontawesomeImage } from './script.js'

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
                    <template v-else-if="item.type === 'image'">
                        <input v-model="filter" class="w3-input w3-border" placeholder="Search...">
                        <div class="grid-images">
                            <i v-for="image in images" class="w3-hover-theme" :class="iconClass(item, image)" @click="selectImage(item, image)"></i>
                        </div>
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
    data: function() {
        return {
            filter: ''
        }
    },
    methods: {
        selectImage(parameter, image) {
            parameter.value = image;
            this.$emit('changed');
        },
        categoryClass(category) {
            return {
                'solid': 'fas',
                'regular': 'far',
                'brands': 'fab'
            }[category];
        },
        iconClass(parameter, image) {
            var classes = [];
            classes.push(image.cssClass);
            classes.push('fa-' + image.name);
            if(parameter.value.name === image.name) {
                classes.push('w3-theme');
            }
            return classes;
        }
    },
    computed:
    {
        images() {
            return this.image_catalog.filter( image => {
                return image.path.toLowerCase().includes(this.filter.toLowerCase())
            });
        }
    }
});