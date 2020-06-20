<template>
    <div class="w3-border-theme source-code-box">
        <pre v-highlightjs="source"><code class="openscad"></code></pre>
    </div>
</template>

<script>
export default {
    name: "SourceCode",
    props: ["source"]
}
</script>

<style scoped>
.source-code-box {
    margin: 20px;
}

.source-code-box pre {
    white-space: pre-wrap;
    word-wrap: normal;
    overflow-x: auto;
    max-height: inherit;
    clear: both;
}
</style>