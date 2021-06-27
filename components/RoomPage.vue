<template>
    <section class="page">
        <portal to="header">
            <div v-if="connection.room" class="code-display">
                <b>Code:</b> {{ connection.room.id }}
            </div>
        </portal>
        <TableTop
            v-if="connection.state.players"
            :players="Object.values(connection.state.players)"
        />
    </section>
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
.page {
    display: flex;
}
</style>
