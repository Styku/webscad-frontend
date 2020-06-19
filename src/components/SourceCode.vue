<template>
    <div class="w3-border-theme source-code-box">
        <pre><code><slot/></code></pre>
    </div>
</template>

<script>
export default {
    name: "SourceCode"
}
</script>

<style scoped>
.source-code-box {
    margin: 20px;
    background-color: white;
    border: 1px solid;
    border-left: 4px solid;
    padding-left: 10px;
}

.source-code-box pre {
    white-space: pre-wrap;
    word-wrap: normal;
    overflow: auto;
    max-height: inherit;
    clear: both;
}
</style>