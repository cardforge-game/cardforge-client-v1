<template>
    <main>
        <MoneyIndicator />

        <section class="card-preview">
            <h1>
                You've made <b class="h1">{{ acceptedCards }}</b> cards.
            </h1>
            <br />

            <details v-if="currentCache.length > 0" open>
                <summary class="selectable unhighlightable bold h4">
                    Previous Cards
                </summary>
                <div v-for="(card, i) in previousCards" :key="i"></div>
            </details>

            <details open>
                <summary class="selectable unhighlightable bold h4">
                    Card Preview
                </summary>
                <Card :size="30" :card="cardData" :show-details="true" />
            </details>
        </section>
        <section>
            <form @submit.prevent="publishCard">
                <div class="subsection">
                    <h3>Card Stats</h3>

                    <div class="attack-form inline-fields">
                        <div class="field">
                            <label>Card Name</label>
                            <input
                                v-model="cardData.name"
                                placeholder="Lord of Darkness"
                                maxlength="24"
                                required
                            />
                        </div>

                        <div class="field">
                            <label>Card Health</label>
                            <input
                                v-model.number="cardData.health"
                                type="number"
                                placeholder="10"
                                required
                            />
                        </div>

                        <div class="field">
                            <label>Card Image URL</label>
                            <input
                                v-model="cardData.imgURL"
                                placeholder="link.jpg"
                                required
                            />
                        </div>
                    </div>
                </div>

                <h3>
                    Card Attacks
                    <button
                        v-if="cardData.attacks.length < 3"
                        style="
                            --normal-color: var(--success-darker);
                            --active-color: var(--light);
                        "
                        @click="
                            cardData.attacks.push({
                                name: '',
                                desc: '',
                            })
                        "
                    >
                        Add Attack
                    </button>
                </h3>

                <p v-if="cardData.attacks.length === 0" class="field">
                    You have no attacks setup! Click "Add Attack"
                </p>
                <div
                    v-for="(a, i) in cardData.attacks"
                    :key="`attackCardCreation-${i}`"
                    class="attack-form"
                >
                    <div class="field">
                        <label>Attack Name</label>
                        <input
                            v-model="a.name"
                            placeholder="Slap"
                            maxlength="20"
                            required
                        />
                    </div>

                    <div class="field">
                        <label>Attack Description</label>
                        <textarea
                            v-model.lazy="a.desc"
                            maxlength="100"
                            :placeholder="`${
                                cardData.name || 'someone'
                            } slaps the enemy dealing 10 damage!`"
                            required
                        />
                    </div>

                    <div class="field">
                        <button
                            style="--normal-color: var(--danger)"
                            @click="cardData.attacks.splice(i, 1)"
                        >
                            Remove Attack
                        </button>
                    </div>
                </div>

                <div class="subsection">
                    <div class="button-group">
                        <button
                            type="button"
                            style="
                                --normal-color: var(--primary-dark);
                                --active-color: var(--light);
                            "
                            @click="previewCard"
                        >
                            Preview Card
                        </button>
                        <button
                            type="submit"
                            style="
                                --normal-color: var(--success-darker);
                                --active-color: var(--light);
                            "
                        >
                            Publish Card
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import connection from "~/connection";
import { IPreviewCard } from "~/@types";

export default Vue.extend({
    data() {
        return {
            cardData: {
                name: "Test Card",
                health: 10,
                cardCost: 2,
                imgURL: "https://cdn.discordapp.com/icons/838576957909237791/4eb40941d1b57d2ce52e58182792e0e7.webp?size=256",
                attacks: [
                    {
                        name: "Tail Whip",
                        desc: "Tail smacks the enemy dealing 7 damage",
                    },
                    {
                        name: "Heal Smack",
                        desc: "Smack the enemy to deal 5 damage. Test Card heals 2 health in the process.",
                    },
                ],
            } as IPreviewCard,
            acceptedCards: 0,
            currentCache: JSON.parse(
                localStorage.getItem("cachedCards") || "[]"
            ),
        };
    },
    mounted() {
        if (!connection.eventRegistered && connection.room) {
            connection.eventRegistered = true;

            connection.room.onMessage("previewCard", (card: IPreviewCard) => {
                this.cardData = card;
            });

            connection.room.onMessage("cardAccepted", () => {
                Swal.fire({
                    title: "Card Accepted!",
                    icon: "success",
                    toast: true,
                });

                this.acceptedCards++;

                this.currentCache = JSON.parse(
                    localStorage.getItem("cachedCards") || "[]"
                );

                if (this.currentCache.length >= 7) {
                    this.currentCache.shift();
                }

                localStorage.setItem(
                    "cachedCards",
                    JSON.stringify([...this.currentCache, this.cardData])
                );

                this.cardData = {
                    name: "",
                    health: 10,
                    imgURL: "",
                    attacks: [],
                };
            });
        }
    },
    methods: {
        publishCard() {
            connection.room?.send("submitCard", this.cardData);
        },
        previewCard() {
            connection.room?.send("previewCard", this.cardData);
        },
    },
});
</script>

<style scoped>
main {
    flex-direction: row;
    align-items: stretch;
}
main section {
    margin: 1.5rem 1.5rem;
    flex: 1;
    overflow-y: auto;
}

.card-preview {
    text-align: center;
}

details:first-of-type summary {
    border-radius: 10px 10px 0 0;
}

details:last-of-type summary {
    border-radius: 0 0 10px 10px;
}

.card-preview summary {
    background: var(--primary-dark);
    color: var(--light);
    padding: 1rem;
    text-align: left;
}

.card {
    text-align: left;
    display: inline-flex;
    margin-top: 2rem;
}

@media only screen and (max-width: 1100px) {
    main {
        flex-direction: column;
    }
    main section {
        flex: none;
    }
}

.subsection {
    margin: 0 0.5rem;
}

.field {
    margin: 1rem 0;
}

.inline-fields .field {
    display: inline-block;
    margin-right: 1rem;
}

input,
textarea {
    padding: 0.25rem 0.5rem;
}

.field label {
    font-weight: bold;
    display: block;
}

.field textarea {
    width: 30rem;
    height: 5rem;
}

h3 {
    display: flex;
    align-items: center;
}

h3 * {
    margin: 0 1rem;
}

.attack-form {
    padding: 1rem;
    border: var(--primary) 1.5px solid;
    margin: 1rem 0;
    border-radius: 10px;
}
</style>
