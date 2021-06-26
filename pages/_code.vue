<template>
    <main></main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    computed: {
        code() {
            return this.$route.params.code;
        },
    },
});
</script>
