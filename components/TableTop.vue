<template>
    <div class="table">
        <div class="row top">
            <template v-for="(n, i) in 3">
                <Card
                    v-if="players[i] && players[i].activeCard"
                    :key="i"
                    :card="players[i].activeCard"
                    :size="9"
                    :graphic-only="true"
                />
                <p v-else-if="players[i]" :key="i" class="no-active-username">
                    {{ players[i].name }}
                    {{ players[i].host ? "👑" : "" }}
                </p>
            </template>
        </div>
        <div class="row mid">
            <template v-for="(n, i) in 2">
                <Card
                    v-if="players[i + 3] && players[i + 3].activeCard"
                    :key="i"
                    :card="{
                        id: 'xd',
                        name: 'Triton Hacks ' + i,
                        health: 100,
                        cardCost: 2,
                        imgURL: 'https://cdn.discordapp.com/icons/838576957909237791/4eb40941d1b57d2ce52e58182792e0e7.webp?size=256',
                        attacks: [
                            { name: 'Tail Whip', damage: 20 },
                            { name: 'Heal Smack', heal: 40, damage: 10 },
                        ],
                    }"
                    :size="9"
                    :graphic-only="true"
                />
                <p
                    v-else-if="players[i + 3]"
                    :key="i"
                    class="no-active-username"
                >
                    {{ players[i + 3].name }}
                    {{ players[i + 3].host ? "👑" : "" }}
                </p>
            </template>
        </div>
        <div class="row bottom">
            <template v-for="(n, i) in 3">
                <Card
                    v-if="players[i + 5] && players[i + 5].activeCard"
                    :key="i"
                    :card="{
                        id: 'xd',
                        name: 'Triton Hacks ' + i,
                        health: 100,
                        cardCost: 2,
                        imgURL: 'https://cdn.discordapp.com/icons/838576957909237791/4eb40941d1b57d2ce52e58182792e0e7.webp?size=256',
                        attacks: [
                            { name: 'Tail Whip', damage: 20 },
                            { name: 'Heal Smack', heal: 40, damage: 10 },
                        ],
                    }"
                    :size="9"
                    :graphic-only="true"
                />
                <p
                    v-else-if="players[i + 5]"
                    :key="i"
                    class="no-active-username"
                >
                    {{ players[i + 5].name }}
                    {{ players[i + 5].host && "👑" }}
                </p>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: {
        players: {
            type: Array,
            required: true,
        },
    },
});
</script>

<style scoped>
.no-active-username {
    color: var(--light);
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    background: var(--dark);
    padding: 0.5rem 1rem;
    border-radius: 10px;
}

.table {
    background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/1280px-UNO_Logo.svg.png),
        var(--primary-dark);

    background-size: 143px 100px;
    background-repeat: no-repeat;
    background-position: center;

    display: flex;
    flex-direction: column;
    flex: 1;

    box-shadow: 0 0 20px rgba(1, 9, 32, 0.5);

    margin: 0;
    width: 100%;
    padding-bottom: 1rem;
}

.row {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;

    margin: 0 5rem;
}

.row.mid {
    justify-content: space-between;
}

@media only screen and (min-width: 1000px) {
    .row.mid .card:first-of-type::v-deep {
        transform: rotate(90deg);
    }

    .row.mid .card:last-of-type::v-deep {
        transform: rotate(-90deg);
    }

    .row.top {
        transform: rotate(180deg);
    }

    .row.top .no-active-username {
        transform: rotate(180deg);
    }

    .row.top .card:first-of-type::v-deep,
    .row.bottom .card:first-of-type::v-deep {
        transform: rotate(45deg);
    }

    .row.top .card:last-of-type,
    .row.bottom .card:last-of-type {
        transform: rotate(-45deg);
    }
}
</style>
