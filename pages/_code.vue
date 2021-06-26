<template>
    <main v-if="room">
        <section v-if="room.state.phase === 'WAITING'">waiting</section>
        <section v-else-if="room.state.phase === 'CREATING'">creating</section>
        <section v-else-if="room.state.phase === 'DECK'">deck</section>
        <section v-else-if="room.state.phase === 'FIGHT'">fight</section>
    </main>
</template>

<script lang="ts">
import Vue from "vue";

import state from "~/state";

export default Vue.extend({
    computed: {
        room() {
            return state.room;
        },
        code() {
            return this.$route.params.code;
        },
    },
    mounted() {
        if (!this.room) {
            this.$router.push("/");
        }
    },
});
</script>
