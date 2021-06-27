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
                        <img class="image" src="/logo.png" />
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
                    <h1 class="bold">How to Play</h1>
                </div>
            </div>
            <div class="hero-section-1">
                <div class="hero-column-right-instructions">
                    <h4>Joining a Game Room</h4>
                </div>
                <div class="hero-column-left-instructions">
                    <div>
                        To create a game room, you can click the
                        <a
                            class="bold selectable"
                            style="color: var(--primary-dark)"
                            @click="initGame('createGame')"
                        >
                            Start Game
                        </a>
                        button above. If someone else has started a game, you
                        can join them using their code by clicking the
                        <a
                            class="bold selectable"
                            style="color: var(--success-dark)"
                            @click="initGame('joinGame')"
                        >
                            Join Game
                        </a>
                        button above.
                    </div>
                </div>
                <div class="hero-column-right-instructions">
                    <h4>Phase 1: Creation</h4>
                </div>
                <div class="hero-column-left-instructions">
                    <div>
                        During the creation phase, you can design and build your
                        own cards. A card has a custom image, health value, and
                        attacks. Simply describe each attack, and our artifical
                        intelligence system will create a corresponding card,
                        almost magically.
                    </div>
                </div>
                <div class="hero-column-right-instructions">
                    <h4>Phase 2: Deck Building</h4>
                </div>
                <div class="hero-column-left-instructions">
                    <div>
                        Build your game deck using the cards your opponents have
                        created. This is your inventory of cards. From your
                        inventory, you can choose up to 8 cards to bring into
                        battle. This is your deck. Choose a deck wisely, as you
                        cannot change it during a round!
                    </div>
                </div>
                <div class="hero-column-right-instructions">
                    <h4>Phase 3: Fighting</h4>
                </div>
                <div class="hero-column-left-instructions">
                    <div>
                        During the fight, choose an active card to play with.
                        Using this card, you can deal damage to other cards and
                        heal yourself during your turn. Your goal is to knock
                        out as many players as you can while keeping you
                        characters at a high health! When you are knocked out,
                        you may substitute in another card from your deck.
                    </div>
                </div>
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

<style scoped>
.hero-section-1 {
    height: 50%;
    width: 100%;
    top: 50%;
    left: 50%;
    display: flex;
    flex-wrap: wrap;
}

.hero-section-2 {
    height: 60%;
    width: 100%;
    top: 50%;
    left: 50%;
    background-color: rgb(47, 54, 66);
    display: flex;
    flex-wrap: wrap;
    color: white;
}

.hero-section-2-small {
    display: flex;
    padding: 2.7vw;
    /* height: 40%; */
    width: 100%;
    top: 50%;
    left: 50%;
    background-color: rgb(47, 54, 66);
    display: flex;
    flex-wrap: wrap;
    color: white;
    justify-content: center;
}

.hero-section-1-small {
    display: flex;
    padding: 30px;
    /* height: 40%; */
    width: 100%;
    top: 50%;
    left: 50%;
    display: flex;
    flex-wrap: wrap;
    color: white;
    justify-content: center;
}

.hero-column-right {
    flex: 50%;
    padding: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
}

.hero-column-left {
    flex: 50%;
    padding: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
}

.hero-column-right-instructions {
    flex: 30%;
    padding: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
}

.hero-column-left-instructions {
    flex: 70%;
    padding: 25px;
    display: flex;
    align-items: center;
    align-content: center;
}

.title {
    font-size: 4rem;
    font-family: "Segoe UI", sans-serif;
    font-style: bold;
}

.image {
    max-height: 80%;
    max-width: 80%;
    animation-duration: 2s;
    animation-name: fly-in;
}
</style>
