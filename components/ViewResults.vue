<template>
    <main>
        <ol v-if="results">
            <li v-for="(player, i) in Object.entires(results)">
                <b>{{ player[0] }}</b
                >: {{ player[1] }} points
            </li>
        </ol>
    </main>
</template>

<script>
import connection from "~/connection";
export default {
    computed: {
        results() {
            return connection.results;
        },
    },
};
</script>

<style scoped>
main {
    margin: 4rem 8rem;
}
</style>
