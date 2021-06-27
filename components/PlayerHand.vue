<template>
    <footer>
        <div class="deck">
            <Card
                @click="setActive(i)"
                v-for="(card, i) in connection.currentPlayer.deck"
                :key="i"
                :card="card"
                :size="15"
                :rotation="getCardRotation(i)"
                :show-details="true"
                :custom-style="`z-index: ${i + 100};`"
            />
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from "vue";
import connection from "~/connection";

export default Vue.extend({
    computed:{
        connection() {
            return connection;
        }
    },
    data() {
        return {
            cards: [
                "Tensorflow",
                "Meat Shield",
                "Skittles",
                "Tylenol",
                "Motrin",
                "Tylenol",
                "Motrin",
            ],
        };
    },

    methods: {
        getCardRotation(i: number) {
            const midpoint = (this.cards.length - 1) / 2;
            return 2.5 * (i - midpoint);
        },
        setActive(index: number){
            connection.room?.send("setActive",{index})
        }
    },
});
</script>

<style scoped>
footer {
    justify-self: flex-end;
    align-self: stretch;
    position: relative;
    height: 2.5rem;
}

.deck {
    background: var(--success-dark);

    position: absolute;
    left: 0;
    right: 0;
    bottom: -15rem;

    height: 17.5rem;
    transition: bottom 0.25s ease-in-out;

    box-shadow: 0 -5px 20px rgba(1, 9, 32, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    margin: 0 -2rem;

    transition: transform 0.25s ease-in-out;
}

.card:hover {
    transform: translateY(-20rem) scale(1.25) !important;
    z-index: 500 !important;
}
</style>
