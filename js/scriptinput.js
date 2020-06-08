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
                        <select class="w3-input w3-border" @change="selectCategory(item, $event)">
                            <option v-for="(value, key) in image_catalog" v-bind:value="key" :selected="key === categoryFromPath(item)">{{ key }}</option>
                        </select>
                        <input v-model="filter" class="w3-input w3-border" placeholder="Search...">
                        <div class="grid-images">
                            <i v-for="image in images(item)" class="w3-hover-theme" :class="iconClass(item, image)" @click="selectImage(item, image)"></i>
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
        selectCategory(parameter, event) {
            var path = parameter.value.split('/');
            path[0] = event.target.value;
            parameter.value = path.join('/');
        },
        selectImage(parameter, image) {
            var path = parameter.value.split('/');
            path[1] = image;
            parameter.value = path.join('/');
            this.$emit('changed');
        },
        categoryFromPath(parameter) {
            return parameter.value.split('/')[0];
        },
        imageFromPath(parameter) {
            return parameter.value.split('/')[1];
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
            var category = this.categoryFromPath(parameter);
            classes.push(this.categoryClass(category));
            classes.push('fa-' + image);
            if(this.imageFromPath(parameter) === image) {
                classes.push('w3-theme');
            }
            return classes;
        },
        images(parameter) {
            return this.image_catalog[this.categoryFromPath(parameter)].filter( image => {
                return image.toLowerCase().includes(this.filter.toLowerCase())
            });
        }
    }
});