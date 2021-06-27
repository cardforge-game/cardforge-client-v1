<template>
    <div
        class="card"
        :style="`
            width:${size}rem;
            height:${(size * 4) / 3}rem;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${
                card.imgURL
            });
            background-size: cover;
            background-position: center; 
            transform: rotate(${rotation}deg);
        `"
    >
        <div class="cardHeader">
            <h1 class="cardTitle">{{ card.name }}</h1>
        </div>

        <div v-if="showDetails" class="cardContent">
            <div class="attackContainer">
                <div
                    v-for="(a, i) in card.attacks"
                    :key="`attk-${i}`"
                    class="attack"
                >
                    <p class="outline">{{ a.name }}</p>
                    <div class="outline attackStats">
                        <p v-if="a.damage" class="attackStat">
                            {{ a.damage }}⚔️
                        </p>
                        <p v-if="a.heal" class="attackStat">{{ a.heal }}🩹</p>
                    </div>

                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            required: true,
        },
        card: {
            type: Object,
            required: true,
        },
        rotation: {
            type: Number,
            default: 0,
        },
        showDetails: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        handleClick() {
            this.$emit("click");
        },
    },
};
</script>

<style>
.attackStats {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.attackStat {
    font-size: 80%;
    white-space: nowrap;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.attack {
    display: grid;
    grid-template-columns: 4fr 1fr;
}

.attackContainer {
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

.cardContent {
    margin-top: 4rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 50%;
}

.cardContent * {
    color: var(--light);
}

.cardTitle {
    overflow: hidden;
    color: var(--light);
    font-weight: bold;
    font-size: 140%;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-left: 0.5rem;
}

.card {
    min-width: 100px;
    min-height: 140px;
    border-radius: 10px;
    border: 2px solid var(--light);
}

hr {
    border: none;
    border-top: 1px white solid;
}
</style>
