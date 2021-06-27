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
                        <Card :key="`card-${i}`" :card="c" :size="12.5"></Card>
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

<script>
import connection from "~/connection";
export default {
    data() {
        return {
            cards: [],
            inventory: [],
        };
    },
    mounted() {
        for (let i = 0; i < 5; i++) {
            this.cards.push({
                id: "xd",
                name: "Senko Sanko " + i,
                health: 100,
                cardCost: 2,
                imgURL: "https://i.pinimg.com/originals/46/ba/83/46ba83a5a0266908308541742c53abd3.jpg",
                attacks: [
                    { name: "Tail Whip", damage: 20 },
                    { name: "Heal Smack", heal: 40, damage: 10 },
                ],
            });
        }
    },
    methods: {
        buyCard(id) {
            connection.room?.send("buyCard", id);
        },
        addToDeck(index) {
            connection.room?.send("addCardToDeck", index);
        },
        addToInv(index) {
            connection.room?.send("addCardToDeck", index);
        },
    },
};
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
