<template>
    <main>
        <section class="cardPreview">
            <Card :size="30" :card="cardData"></Card>
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
                                maxlength="25"
                                required
                            />
                        </div>

                        <div class="field">
                            <label>Card Health</label>
                            <input
                                v-model="cardData.health"
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
                            v-model="a.desc"
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
                            style="--normal-color: var(--primary-dark)"
                            @click="previewCard"
                        >
                            Preview Card
                        </button>
                        <button
                            type="submit"
                            style="--normal-color: var(--success-darker)"
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
                name: "",
                health: 0,
                imgURL: "",
                attacks: [],
            } as IPreviewCard,
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
                this.cardData = {
                    name: "",
                    health: 0,
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
    margin: 3rem 3rem;
    flex: 1;
    overflow-y: auto;
}
@media only screen and (max-width: 700px) {
    main {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
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
