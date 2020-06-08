Vue.component('scriptlist', {
    props: ['scripts', 'selected_script'],
    template: `
        <div class="grid-scripts w3-theme-l4" v-if="selected_script">
            <div v-for="item in scripts" @click.prevent="$emit('selected', item.script)" class="w3-card w3-hover-shadow w3-white w3-center">
                <div v-bind:class="{'w3-container': true, 'w3-theme': item.script != selected_script.id, 'w3-theme-d4': item.script == selected_script.id}">
                    <h5>{{ item.script }}</h5>
                </div>
                <img v-bind:src="item.image" class="thumbnail"> 
            </div>
        </div>
    `
});