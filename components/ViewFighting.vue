<template>
    <main>
        <TableTop
            v-if="connection.state.players"
            :players="Object.values(connection.state.players)"
        />

        <PlayerHand />
    </main>
</template>

<style scoped>
main {
    align-items: center;
    overflow: hidden;
}
</style>

<script lang="ts">
import Vue from 'vue'
import connection from "~/connection";

export default Vue.extend({
    computed: {
        connection() {
            return connection;
        },
    },
    
})
</script>
