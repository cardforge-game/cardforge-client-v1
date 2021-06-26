<template>
    <main>
        <header>
            <span class="h5">CardFlow</span>

            <button class="start-button" style="--normal-color: var(--success)">
                Start Game
            </button>
        </header>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
header {
    padding: 1rem;
    background: var(--dark);
    display: flex;
    align-items: center;
}

header .h5 {
    color: var(--light);
}

header .start-button {
    margin-left: auto;
}
</style>
