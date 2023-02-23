<template>
    <div id="app">
            <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    /* ios端点击div出现阴影 */
    div {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    
    
</style>