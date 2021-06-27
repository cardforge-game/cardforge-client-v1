<template>
    <main>
        <MoneyIndicator />

        <TableTop
            v-if="connection.state.players"
            :players="Object.values(connection.state.players)"
            :active-id="connection.state.activePlayerID"
        />

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
    },
});
</script>

<style scoped>
main {
    align-items: center;
    overflow: hidden;
}
</style>
