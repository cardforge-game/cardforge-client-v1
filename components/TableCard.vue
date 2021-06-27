<template>
    <div class="column">
        {{ player }}
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        player: {
            type: String,
            required: true,
        },
    },
});
</script>

<style scoped>
.column {
    background: var(--danger);
    width: 7.5rem;
    height: 10rem;

    border-radius: 15px;
    border: 1px white solid;

    text-align: center;
    padding: 1rem;
}
</style>
