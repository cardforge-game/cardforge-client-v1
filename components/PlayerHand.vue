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

    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    color: var(--light);
    display: inline-block;
    background: #a55eea;
    color: white;

    width: 13.5rem;
    height: 20rem;
    margin: 0 -2rem;

    border-radius: 20px;
    box-shadow: 0 -5px 20px rgba(1, 9, 32, 0.5);
    border: 2px solid white;

    text-align: left;

    overflow: hidden;

    transition: transform 0.25s ease-in-out;
}

.card .title {
    color: var(--light);
    background: #8854d0;

    font-size: 1.5rem;

    padding: 0.5rem;

    display: flex;
}

.card .health {
    color: var(--light);
    font-size: 1.25rem;
    margin-left: auto;
    font-weight: bold;
}

.card:hover {
    transform: translateY(-17rem) scale(1.25) !important;
    z-index: 100;
}
</style>
