<template>
    <div v-if="players" class="table">
        <div class="card-dialog-perspective">
            <div class="card-dialog" :style="cardDialogStyles">
                <Card
                    v-if="currentActiveCard"
                    :card="currentActiveCard"
                    :size="25"
                    :show-details="true"
                    :is-interactive="true"
                    @onAttackTrigger="doAttack"
                />
            </div>
        </div>
        <div class="row top">
            <template v-for="(n, i) in 3">
                <Card
                    v-if="
                        displayPlayers[i + 5] &&
                        displayPlayers[i + 5].activeCard
                    "
                    :key="i + 5"
                    :card="displayPlayers[i + 5].activeCard"
                    :class="{ active: isActivePlayer(i + 5) }"
                    :size="9"
                    :graphic-only="true"
                    :custom-style="
                        isEnemy(i + 5) ? `border-color: var(--danger);` : ''
                    "
                    @click="onCardClick(i + 5)"
                />
                <p
                    v-else-if="displayPlayers[i + 5]"
                    :key="i + 5"
                    class="no-active-username"
                >
                    {{ displayPlayers[i + 5].name }}
                    {{ displayPlayers[i + 5].host ? "👑" : "" }}
                </p>
            </template>
        </div>
        <div class="row mid">
            <template v-for="(n, i) in 2">
                <Card
                    v-if="
                        displayPlayers[i + 3] &&
                        displayPlayers[i + 3].activeCard
                    "
                    :key="i + 3"
                    :card="displayPlayers[i + 3].activeCard"
                    :class="{ active: isActivePlayer(i + 3) }"
                    :size="9"
                    :graphic-only="true"
                    :custom-style="
                        isEnemy(i + 3) ? `border-color: var(--danger);` : ''
                    "
                    @click="onCardClick(i + 3)"
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
                    :class="{ active: isActivePlayer(i) }"
                    :size="9"
                    :graphic-only="true"
                    :custom-style="
                        isEnemy(i) ? `border-color: var(--danger);` : ''
                    "
                    @click="onCardClick(i)"
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
import Vue from "vue";

import connection from "~/connection";

import { IAttack, IPlayer } from "~/@types";

export default Vue.extend({
    data() {
        return {
            turnInitiated: false,
            showCardDialog: false,
            attackTarget: null as string | null,
        };
    },
    computed: {
        currentActiveCard() {
            return connection.currentPlayer?.activeCard;
        },
        displayPlayers(): IPlayer[] {
            if (connection.currentPlayer) {
                const copy = [...this.players];

                const self = copy.findIndex(
                    (p) => p.id === connection.currentPlayer?.id
                );

                if (copy.length > 1) {
                    [copy[self], copy[1]] = [copy[1], copy[self]];
                }

                return copy;
            } else {
                return this.players;
            }
        },
        players(): IPlayer[] {
            return Object.values(connection.state.players || []);
        },
        cardDialogStyles(): string {
            return `
                transform: rotateY(${this.showCardDialog ? -15 : -90}deg);
            `;
        },
    },
    methods: {
        onCardClick(index: number) {
            const player: IPlayer = this.displayPlayers[index];

            const clickedSelf = player.id === connection.currentPlayer?.id;

            const selfTurn =
                connection.currentPlayer?.id ===
                connection.state.activePlayerID;

            if (this.turnInitiated && !clickedSelf) {
                this.turnInitiated = false;
                alert(`You want to attack ${player.name}.`);
                this.attackTarget = player.id || null;
                this.showCardDialog = true;
            } else if (clickedSelf && selfTurn) {
                alert("You initiated a turn.");
                this.turnInitiated = true;
            }
        },
        isActivePlayer(index: number) {
            return (
                connection.state.activePlayerID ===
                this.displayPlayers[index]?.id
            );
        },
        doAttack(_attack: IAttack, attackIndex: number) {
            this.showCardDialog = false;
            connection.room?.send("attack", {
                id: this.attackTarget,
                attackIndex,
            });
        },
        isEnemy(index: number) {
            const player: IPlayer = this.displayPlayers[index];

            const selfTurn =
                connection.currentPlayer?.id ===
                connection.state.activePlayerID;

            const isSelf = player.id === connection.currentPlayer?.id;

            return selfTurn && !isSelf;
        },
    },
});
</script>

<style scoped>
.active {
    border: 5px solid var(--success);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: rotate(var(--rotate)) scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
        transform: rotate(var(--rotate)) scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
        transform: rotate(var(--rotate)) scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
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
    background: url(/logo.png), radial-gradient(#6dd5ed, #387989);

    background-size: 400px 224px, cover;
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

.card-dialog-perspective {
    perspective: 1000px;
}

.card-dialog {
    transition: transform 0.25s ease-in-out;
}

@media only screen and (min-width: 1000px) {
    .row.mid .card:first-of-type::v-deep {
        --rotate: -90deg;
    }

    .row.mid .card:last-of-type::v-deep {
        --rotate: -90deg;
    }

    .row.top {
        --rotate: --180deg;
    }

    .row.top .no-active-username {
        --rotate: -180deg;
    }

    .row.top .card:first-of-type::v-deep,
    .row.bottom .card:first-of-type::v-deep {
        --rotate: 45deg;
    }

    .row.top .card:last-of-type,
    .row.bottom .card:last-of-type {
        --rotate: -45deg;
    }
}
</style>
