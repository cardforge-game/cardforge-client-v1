<template>
    <footer>
        <div class="deck">
            <Card
                v-for="(card, i) in cards"
                :key="i"
                :card="{
                    name: `${card} ${i}`,
                    health: 100,
                    imgURL: 'https://cdn.discordapp.com/icons/838576957909237791/4eb40941d1b57d2ce52e58182792e0e7.webp?size=256',
                    attacks: [
                        {
                            name: 'Tail Whip',
                            damage: 20,
                            desc: 'senko san won triton hacks and infinten vbuck',
                        },
                        {
                            name: 'Heal Smack',
                            heal: 40,
                            damage: 10,
                            desc: 'i am not just your hrealer fire in the hole watch this',
                        },
                    ],
                }"
                :size="15"
                :rotation="getCardRotation(i)"
                :show-details="true"
                :style="`z-index: ${i + 100};`"
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
    height: 3rem;
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
