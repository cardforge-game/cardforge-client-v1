<template>
    <div class="table">
        <div class="row top">
            <template v-for="(n, i) in 3">
                <Card
                    v-if="displayPlayers[i + 5] && displayPlayers[i + 5].activeCard"
                    :key="i + 5"
                    :card="displayPlayers[i + 5].activeCard"
                    :class="{ active: (displayPlayers[i + 5].id === activeID) }"
                    :size="9"
                    :graphic-only="true"
                />
                <p v-else-if="displayPlayers[i + 5]" :key="i + 5" class="no-active-username">
                    {{ displayPlayers[i + 5].name }}
                    {{ displayPlayers[i + 5].host ? "👑" : "" }}
                </p>
            </template>
        </div>
        <div class="row mid">
            <template v-for="(n, i) in 2">
                <Card
                    v-if="displayPlayers[i + 3] && displayPlayers[i + 3].activeCard"
                    :key="i + 3"
                    :card="displayPlayers[i + 3].activeCard"
                    :class="{ active: (displayPlayers[i + 3].id === activeID) }"
                    :size="9"
                    :graphic-only="true"
                />
                <p
                    v-else-if="displayPlayers[i + 3]"
                    :key="i + 3"
                    class="no-active-username"
                >
                    {{ displayPlayers[i + 3].name }}
                    {{ displayPlayers[i + 3].host ? "👑" : "" }}
                </p>
            </template>
        </div>
        <div class="row bottom">
            <template v-for="(n, i) in 3">
                <Card
                    v-if="displayPlayers[i] && displayPlayers[i].activeCard"
                    :key="i"
                    :card="displayPlayers[i].activeCard"
                    :class="{ active: (displayPlayers[i].id === activeID) }"
                    :size="9"
                    :graphic-only="true"
                />
                <p
                    v-else-if="displayPlayers[i]"
                    :key="i"
                    class="no-active-username"
                >
                    {{ displayPlayers[i].name }}
                    {{ displayPlayers[i].host ? "👑" : "" }}
                </p>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import connection from "~/connection";
import { IPlayer } from "~/@types";

export default Vue.extend({
    props: {
        players: {
            type: Array as PropType<IPlayer[]>,
            required: true,
        },
        activeID: {
            type: String,
            required: false,
            default: ""
        },
    },
    computed: {
        displayPlayers(): IPlayer[] {
            if (connection.currentPlayer) {
                const copy = [...this.players];

                const self = copy.findIndex(p => p.id === connection.currentPlayer?.id);
                console.log(self);

                if (copy.length > 1) {
                    [copy[self], copy[1]] = [copy[1], copy[self]];
                }

                return copy;
            } else {
                return this.players;
            }
        }
    }
});
</script>

<style scoped>
.active{
    border: 3px solid rgb(76, 145, 91);
}
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
