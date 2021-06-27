<template>
    <main>
        <div class="row">
            <div class="deck">
                <h1 class="section-header">Card Shop 🛒</h1>
                <div class="card-container">
                    <div
                        v-for="(c, i) in cards"
                        :key="`card-${i}`"
                        class="card-item"
                    >
                        <div class="card-overhead">
                            <span class="card-price-display">
                                Cost: {{ c.cardCost }}
                            </span>
                            <span
                                class="selectable card-buy-button"
                                @click="buyCard(c.id)"
                            >
                                Buy Card
                            </span>
                        </div>
                        <Card
                            :key="`card-${i}`"
                            :card="c"
                            :size="15"
                            :shadow="false"
                        />
                    </div>
                </div>
            </div>
            <div class="deck">
                <h1 class="section-header">Inventory 🎒</h1>
                <div class="cardListing"></div>
            </div>
        </div>

        <div class="row deck horizontal">
            <div class="section-header">
                <h1>Active Deck ⚡</h1>
                <p class="active-deck-info">
                    Select 7 cards from your inventory that you can play in the
                    upcoming round.
                    <br /><br />
                    <b>Currently: 0/7</b>
                </p>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import { ICard } from "~/@types";
import connection from "~/connection";

export default Vue.extend({
    data() {
        return {
            cards: [] as ICard[],
            inventory: [],
        };
    },
    mounted() {
        for (let i = 0; i < 5; i++) {
            this.cards.push({
                id: "xd",
                name: "Triton Hacks " + i,
                health: 100,
                cardCost: 2,
                imgURL: "https://cdn.discordapp.com/icons/838576957909237791/4eb40941d1b57d2ce52e58182792e0e7.webp?size=256",
                attacks: [
                    {
                        name: "Tail Whip",
                        damage: 20,
                        desc: "james charles overdoses on a frappucino",
                    },
                    {
                        name: "Heal Smack",
                        heal: 40,
                        damage: 10,
                        desc: "jojo siwa becomes calliou and wins robux",
                    },
                ],
            });
        }
    },
    methods: {
        buyCard(id: string) {
            connection.room?.send("buyCard", id);
        },
        addToDeck(index: number) {
            connection.room?.send("addCardToDeck", index);
        },
        addToInv(index: number) {
            connection.room?.send("addCardToDeck", index);
        },
    },
});
</script>

<style scoped>
main {
    margin: 1rem 2rem;

    display: flex;
    flex-direction: column;
}

.card-container {
    max-height: 40vh;

    overflow-y: auto;
    overflow-x: hidden;
}

.card-item {
    display: inline-block;

    margin: 0.5rem 1rem;
}

.card-overhead span {
    display: inline-block;

    font-weight: bold;

    padding: 0.25rem 0.5rem;

    border: 2px var(--light) solid;
    border-bottom: none;

    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.card-overhead .card-price-display {
    background-color: var(--success-dark);
}

.card-overhead .card-buy-button {
    background-color: var(--primary-dark);
    color: var(--light);
}

.card-overhead :not(span:first-of-type) {
    margin: 0 -6.25px;
}

.card::v-deep {
    border-top-left-radius: 0;
}

.row {
    display: flex;
}

.row .deck:first-of-type {
    border-radius: 10px 0 0 10px;
    margin-right: 0;
    border-right: none;
}

.row .deck:last-of-type {
    border-radius: 0 10px 10px 0;
    margin-left: 0;
}

.deck {
    background-color: var(--primary-light);
    flex: 1;
    margin: 1rem;
    border: var(--dark) 2px solid;
    border-radius: 10px;
    overflow: hidden;
}

.section-header {
    padding: 1rem;

    border-bottom: 2px var(--dark) solid;

    font-size: max(20px, 2vw);
    font-weight: bold;

    background: var(--primary);
    color: var(--light);
}

.deck.horizontal .section-header {
    border-bottom: none;
    border-right: 2px var(--dark) solid;
    padding: 1rem 0;
}

.deck.horizontal h1 {
    font-size: max(20px, 2vw);
    font-weight: bold;

    color: var(--light);
    padding: 0 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px var(--dark) solid;
}

.active-deck-info {
    padding: 1rem;
    max-width: 11rem;
}
</style>
