<template>
    <footer>
        <div class="deck">
            <Card
                v-for="(card, i) in cards"
                :key="i"
                :card="{
                    name: `${card} ${i}`,
                    health: 100,
                    imgURL: 'https://i.pinimg.com/originals/46/ba/83/46ba83a5a0266908308541742c53abd3.jpg',
                    attacks: [
                        { name: 'Tail Whip', damage: 20 },
                        { name: 'Heal Smack', heal: 40, damage: 10 },
                    ],
                }"
                :size="15"
                :rotation="getCardRotation(i)"
            />
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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
    },
});
</script>

<style scoped>
footer {
    justify-self: flex-end;
    align-self: stretch;
    position: relative;
    height: 5rem;
}

.deck {
    background: var(--success-dark);

    position: absolute;
    left: 0;
    right: 0;
    bottom: -12rem;

    height: 17.5rem;
    transition: bottom 0.25s ease-in-out;

    box-shadow: 0 -5px 20px rgba(1, 9, 32, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    color: var(--light);
    margin: 0 -2rem;

    box-shadow: 0 -5px 20px rgba(1, 9, 32, 0.5);

    overflow: hidden;

    transition: transform 0.25s ease-in-out;
}

.card:hover {
    transform: translateY(-17rem) scale(1.25) !important;
    z-index: 100;
}
</style>
