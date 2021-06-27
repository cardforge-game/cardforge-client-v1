<template>
    <div
        :class="`card ${showDetails ? 'detailed-card' : ''}`"
        :style="cardStyles"
        @click="handleClick"
    >
        <header>
            <h1
                class="card-title"
                :style="`
                    font-size: max(${1.25 * size}px, ${
                    showDetails ? 1.5 : 1.25
                }rem);`"
            >
                {{ card.name }}
            </h1>

            <span class="card-health">
                <b class="small">HP</b>
                <span :class="graphicOnly ? '' : 'h6'">
                    {{ card.health }}
                </span>
            </span>
        </header>

        <div v-if="!graphicOnly" class="card-content">
            <div class="attack-container">
                <div
                    v-for="(a, i) in card.attacks"
                    :key="`attk-${i}`"
                    class="attack"
                    @click="showDetails && showAttackDetails(i)"
                >
                    <div>
                        <p
                            class="outline"
                            :style="`font-size: max(${size}px, 1rem);`"
                        >
                            {{ a.name }}
                        </p>
                        <small
                            v-if="showDetails"
                            :style="`font-size: max(${
                                0.6 * size
                            }px,  0.75rem);`"
                            class="attack-desc"
                        >
                            {{
                                a.desc.length > 30
                                    ? `${a.desc.substring(0, 90)}...`
                                    : a.desc
                            }}
                        </small>
                    </div>
                    <div class="outline attack-stats">
                        <p v-if="a.damage">{{ a.damage }}⚔️</p>
                        <p v-if="a.heal" class="attackStat">{{ a.heal }}🩹</p>
                    </div>

                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import Vue, { PropType } from "vue";
import { ICard } from "~/@types";

export default Vue.extend({
    props: {
        size: {
            type: Number,
            required: true,
        },
        card: {
            type: Object as PropType<ICard>,
            required: true,
        },
        rotation: {
            type: Number,
            default: 0,
        },
        graphicOnly: {
            type: Boolean,
            default: false,
        },
        shadow: {
            type: Boolean,
            default: true,
        },
        showDetails: {
            type: Boolean,
            default: false,
        },
        customStyle: {
            type: String,
            default: "",
        },
    },
    computed: {
        cardStyles() {
            return `
                width: ${this.size}rem;
                height: ${(this.size * 4) / 3}rem;
                background-image: ${
                    this.graphicOnly
                        ? "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),"
                        : "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),"
                } url(${this.card.imgURL});
                ${
                    this.rotation !== 0
                        ? `transform: rotate(${this.rotation}deg);`
                        : ""
                }
                ${
                    this.shadow
                        ? "box-shadow: 0 -5px 20px rgba(1, 9, 32, 0.5);"
                        : ""
                }
                ${this.customStyle}
            `.replace(/\n/g, " ");
        },
    },
    methods: {
        handleClick() {
            this.$emit("click");
        },
        showAttackDetails(i: number) {
            Swal.fire(
                this.card.attacks[i].name,
                this.card.attacks[i].desc,
                "info"
            );
        },
    },
});
</script>

<style>
.attack-stats {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.attack-stats p {
    font-size: 80%;
    white-space: nowrap;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.attack-desc {
    text-overflow: ellipsis;
}

.attack {
    display: grid;
    grid-template-columns: 4fr 1fr;
}

/*.detailed-card .attack {
    cursor: pointer;
    transition: background 0.25s ease-in-out;
    padding: 0.25rem;
    margin: 0.25rem 0;
    border-radius: 5px;
}

.detailed-card .attack:hover {
    background: rgba(255, 255, 255, 0.375);
} */

.attack-container {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    height: 100%;
    justify-content: space-evenly;
}

.outline {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
}

header {
    display: flex;
    align-items: flex-start;
}

.card-health {
    text-align: right;

    margin-left: auto;
    padding: calc(0.375rem - 1px) calc(0.25rem - 1px);

    border-radius: 0 10px 0 10px;
    border-right: 2px var(--light) solid;
    border-top: 2px var(--light) solid;

    position: relative;
    bottom: 2px;
    left: 2px;

    background: var(--success-dark);
}

.card-health * {
    color: white;
}

.card-content {
    margin-top: 4rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 50%;
}

.card-content * {
    color: var(--light);
}

.card-title {
    overflow: hidden;

    color: var(--light);
    font-weight: bold;
    font-size: 140%;

    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    margin-left: 0.5rem;
    margin-top: 0.25rem;
}

.card {
    min-width: 100px;
    min-height: 140px;
    border-radius: 10px;
    border: 2px solid var(--light);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

hr {
    border: none;
    border-top: 1px white solid;
}
</style>
