<template>
    <div v-if="formattedTime !== -1" class="clock-bar h1 bold">
        {{ formattedTime }}
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "~/connection";

export default Vue.extend({
    computed: {
        formattedTime() {
            if (connection.time === -1) return -1;

            const totalSeconds = connection.time / 1000;

            const minutes = (totalSeconds / 60).toString().split(".")[0];
            const seconds = (totalSeconds % 60).toString().split(".")[0];

            return `${minutes}:${seconds.length === 1 ? "0" : ""}${seconds}`;
        },
    },
});
</script>

<style scoped>
.clock-bar {
    background: var(--darker);
    color: var(--light);
    padding: 1rem;
    text-align: center;
}
</style>
