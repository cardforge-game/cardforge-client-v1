<template>
    <main>
        <portal to="header">
            <div class="button-group">
                <button
                    style="--normal-color: var(--success)"
                    @click="initGame('createGame')"
                >
                    Start Game
                </button>
                <button
                    style="--normal-color: var(--primary)"
                    @click="initGame('joinGame')"
                >
                    Join Game
                </button>
            </div>
        </portal>

        <section class="page">hii</section>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

import connection from "~/connection";

export default Vue.extend({
    methods: {
        async initGame(action: "createGame" | "joinGame") {
            const res = await Swal.fire({
                title: "Enter in a username.",
                input: "text",
                inputLabel:
                    "Make it short, sweet, and representative of your greatness.",
                showCancelButton: true,
                inputValidator: (value) =>
                    value.trim().length === 0 ? "Type in a code." : null,
            });

            if (!(res.isDenied || res.isDismissed)) {
                this[action](res.value);
            }
        },

        async createGame(username: string) {
            if ((await connection.createRoom(username)) && connection.room) {
                connection.temp.host = true;
                this.$router.push(`/${connection.room.id}`);
            }
        },
        async joinGame(username: string) {
            const { value: roomId } = await Swal.fire({
                title: "Enter in a room code.",
                input: "text",
                inputLabel: "An alphanumeric code.",
                showCancelButton: true,
                inputValidator: (value) =>
                    value.trim().length === 0 ? "Type in a code." : null,
            });

            connection.temp.username = username;

            if (roomId) {
                this.$router.push(`/${roomId.trim()}`);
            }
        },
    },
});
</script>
