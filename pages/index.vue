<template>
    <main>
        <header>
            <span class="h5">CardFlow</span>

            <div class="button-group">
                <button
                    style="--normal-color: var(--success)"
                    @click="createGame"
                >
                    Start Game
                </button>
                <button
                    style="--normal-color: var(--primary)"
                    @click="joinGame"
                >
                    Join Game
                </button>
            </div>
        </header>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

import state from "~/state";

export default Vue.extend({
    methods: {
        async createGame() {
            await state.createRoom();
        },
        async joinGame() {
            const { value: roomId } = await Swal.fire({
                title: "Enter in a room code.",
                input: "text",
                inputLabel: "An alphanumeric code.",
                showCancelButton: true,
                inputValidator: (value) =>
                    value.trim().length === 0 ? "Type in a code." : null,
            });

            if (roomId) {
                await state.joinRoom(roomId.trim());
            }
        },
    },
});
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

header .button-group {
    margin-left: auto;
}
</style>
