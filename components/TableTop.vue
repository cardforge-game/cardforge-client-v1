<template>
    <div class="table">
        <div class="row top">
            <template v-for="(n, i) in 3">
                <TableCard
                    v-if="players[i]"
                    :key="i"
                    :player="players[i]"
                    :index="i"
                />
            </template>
        </div>
        <div class="row mid">
            <template v-for="(n, i) in 2">
                <TableCard
                    v-if="players[i + 3]"
                    :key="i"
                    :player="players[i + 3]"
                    :index="i + 3"
                />
            </template>
        </div>
        <div class="row bottom">
            <template v-for="(n, i) in 3">
                <TableCard
                    v-if="players[i + 5]"
                    :key="i"
                    :player="players[i + 5]"
                    :index="i + 5"
                />
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
    .row.mid .column:first-of-type {
        transform: rotate(90deg);
    }

    .row.mid .column:last-of-type {
        transform: rotate(-90deg);
    }

    .row.top {
        transform: rotate(180deg);
    }

    .row.top .column:first-of-type,
    .row.bottom .column:first-of-type {
        transform: rotate(45deg);
    }

    .row.top .column:last-of-type,
    .row.bottom .column:last-of-type {
        transform: rotate(-45deg);
    }
}
</style>
