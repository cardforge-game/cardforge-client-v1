<template>
    <section class="page">
        <portal to="header">
            <div
                v-if="connection.currentPlayer && connection.currentPlayer.host"
                class="info-sidebar"
            >
                <div class="text">
                    <span class="lead">You are the host! 👑</span>
                    <div v-if="connection.room" class="code-display">
                        <b>Code:</b> {{ connection.room.id }}
                    </div>
                </div>
                <button
                    style="--normal-color: var(--success)"
                    @click="startGame"
                >
                    Start Game
                </button>
            </div>
        </portal>

        <TableTop />
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
    methods: {
        startGame() {
            connection.room?.send("startGame");
        },
    },
});
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
}

.info-sidebar {
    display: flex;
    align-items: center;
}

.info-sidebar .text {
    text-align: right;
}

.info-sidebar .text * {
    color: var(--light);
}

.info-sidebar button {
    margin: 0 0.5rem;
}
</style>
