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

        <portal to="start">
            <div class="button-group-large">
                <button
                    style="--normal-color: var(--success); font-size: 200%"
                    @click="initGame('createGame')"
                >
                    Start Game
                </button>
                <button
                    style="--normal-color: var(--primary); font-size: 200%"
                    @click="initGame('joinGame')"
                >
                    Join Game
                </button>
            </div>
        </portal>

        <section class="page">
            <div class="hero-section-1">
                <div class="hero-column-right">
                    <div style="text-align: right">
                        <h1 class="title typewriter">CardForge</h1>
                        <p class="subtitle">
                            The card game that puts you at the center.
                        </p>
                    </div>
                </div>
                <div class="hero-column-left">
                    <img class="image slide" src="@/assets/images/cards.svg" />
                </div>
            </div>

            <div class="hero-section-2-small" style="padding-bottom: 0px">
                <h5 style="color: white">
                    Start a game by creating a room, or enter someone else's
                    room with their join code!
                </h5>
            </div>
            <div class="hero-section-2-small">
                <portal-target name="start"></portal-target>
            </div>
            <div class="hero-section-1-small" style="padding-bottom: 0px">
                <div class="hero-column-center">
                    <h1>How to Play</h1>
                </div>
            </div>
            <div class="hero-section-1">
                <div class="hero-column-right">
                    <h4>Joining a Game Room</h4>
                </div>
                <div class="hero-column-left">
                    To create a game room, you can click the
                    <a @click="initGame('createGame')">"Start Game"</a> button
                    above.
                </div>
                <div class="hero-column-right">
                    <h4>Phase 1: Creation</h4>
                </div>
                <div class="hero-column-left">zxcvzxcvzxcv</div>
                <div class="hero-column-right">
                    <h4>Phase 2: Deck Building</h4>
                </div>
                <div class="hero-column-left">zxcvzxcvzxcv</div>
                <div class="hero-column-right">
                    <h4>Phase 3: Fighting</h4>
                </div>
                <div class="hero-column-left">zxcvzxcvzxcv</div>
            </div>
        </section>
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
