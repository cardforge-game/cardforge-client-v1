<template>
    <main>
        <MoneyIndicator />

        <div v-if="activePlayer" class="info-bar">
            <b class="h4">It's {{ activePlayer.name }}'s turn!</b>
        </div>

        <TableTop />
        <PlayerHand />
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "~/connection";

export default Vue.extend({
    computed: {
        connection() {
            return connection;
        },
        activePlayer() {
            return connection.state.players?.[connection.state.activePlayerID];
        },
    },
});
</script>

<style scoped>
.info-bar {
    padding: 1rem;
}

main {
    align-items: center;
    overflow: hidden;
}
</style>
